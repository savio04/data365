import ProfileModel, { IProfile } from '@modules/profiles/IProfileModel';
import { Job } from 'agenda';
import { Data365Provider } from '@shared/providers/Data365Provider/implemantatios/Data365Provider';
import { StorageProvider } from '@shared/providers/StorageProvider/implemantations/StorageProvider';
import { mappingProfileData } from '@shared/utils/mappingFunctions';
import fs from 'fs';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import PostModel, { IPost } from '@modules/posts/IPostsModel';
import CommentModel, { IComment } from '@modules/comments/ICommentModel';

export class GetProfileData {
  public async handler(job: Job, done: () => void): Promise<any> {
    const data365Provider = new Data365Provider();
    const storageProvider = new StorageProvider();

    const profiles = await ProfileModel.find()
    
    const allProfiles: IProfile[] = [];
    const allPosts: IPost[] = [];
    const allComments: IComment[] = [];

    console.log(`Incio do JOB ${new Date()}\n`)
    console.log("Atualização de perfil...")

    await PostModel.deleteMany()
    await CommentModel.deleteMany()

    //profile and posts
    for await (const profile of profiles) {
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

      allProfiles.push(newProfile)
      allPosts.push(...posts)
    }


    //comments
    for await (const post of allPosts) {

      const response = await data365Provider.getCommentsByPost(post.id)

      const { items: comments } = response.data

      await CommentModel.insertMany(comments, { ordered: true })

      allComments.push(...comments)
    }

    console.log("Atualização de perfil finalizada!")

    console.log("Construindo csv...")
    
    /**CSV */
    const csvProfiles = mappingProfileData(allProfiles)
    const csvPosts = mappingProfileData(allPosts)
    const csvComments = mappingProfileData(allComments)

    dayjs.extend(utc);
    dayjs.extend(timezone);

    const filename = dayjs().local().format(`DD_MM_YYYY-HH:mm`)

    //Profiles
    fs.writeFile(`temp/${filename}.csv`, csvProfiles, 'utf-8', (error) => {
      if(error) console.log("error", error)
    })
    
    await storageProvider.updloadFile({
      filename: `profiles_${filename}.csv`,
      folder: 'Dados dos perfis',
      path: `temp/${filename}.csv`
    })

    //Posts
    fs.writeFile(`temp/${filename}.csv`, csvPosts, 'utf-8', (error) => {
      if(error) console.log("error", error)
    })

    await storageProvider.updloadFile({
      filename: `posts_${filename}.csv`,
      folder: 'Dados dos posts',
      path: `temp/${filename}.csv`
    })

    //Comments
    fs.writeFile(`temp/${filename}.csv`, csvComments, 'utf-8', (error) => {
      if(error) console.log("error", error)
    })

    await storageProvider.updloadFile({
      filename: `comments_${filename}.csv`,
      folder: 'Dados dos comentarios',
      path: `temp/${filename}.csv`
    })

    console.log("Arquivo gerado com sucesso!\n")

    console.log(`FIm do JOB ${new Date()}\n`)

    done();
  }
}