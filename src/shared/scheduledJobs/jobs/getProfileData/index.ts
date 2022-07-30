import ProfileModel, { IProfile } from '@modules/profiles/IProfileModel';
import { Job } from 'agenda';
import { Data365Provider } from '@shared/providers/Data365Provider/implemantatios/Data365Provider';
import { StorageProvider } from '@shared/providers/StorageProvider/implemantations/StorageProvider';
import { mappingProfileData } from '@shared/utils/mappingFunctions';
import fs from 'fs';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import PostModel from '@modules/posts/IPostsModel';

export class GetProfileData {
  public async handler(job: Job, done: () => void): Promise<any> {
    const data365Provider = new Data365Provider();
    const storageProvider = new StorageProvider();

    const profiles = await ProfileModel.find()
    const newProfiles: IProfile[] = []
    
    console.log(`Incio do JOB ${new Date()}\n`)
    console.log("Atualização de perfil...")

    await PostModel.deleteMany()

    for await (const profile of profiles) {
      /**
       * [x] Atualizar dados do perfil
       * [x] Exportar csv
       * [x] Salvar no S3
       */

      const response = await data365Provider.getDataProfile(profile.username)
      const { profile: profileResponse, posts } = response as any;

      const newProfile = Object.assign(profile.toObject(), profileResponse)

      await ProfileModel.updateOne(
        {
          _id: profile._id
        },
        {
          ...newProfile
        }
      )

      
      await PostModel.insertMany(posts, { ordered: true })

      newProfile['posts'] = posts

      newProfiles.push(newProfile)
    }

    console.log("Atualização de perfil finalizada!")

    console.log("Construindo csv...")
    
    const csvData = mappingProfileData(newProfiles)

    dayjs.extend(utc);
    dayjs.extend(timezone);

    const filename = dayjs().local().format(`DD_MM_YYYY-HH:mm`)

    fs.writeFile(`temp/${filename}.csv`, csvData, 'utf-8', (error) => {
      if(error) console.log("error", error)
    })

    await storageProvider.updloadFile(`temp/${filename}.csv`, `${filename}.csv`)

    console.log("Arquivo gerado com sucesso!\n")

    console.log(`FIm do JOB ${new Date()}\n`)

    done();
  }
}