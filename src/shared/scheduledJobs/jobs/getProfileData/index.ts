import ProfileModel, { IProfile } from '@modules/profiles/IProfileModel';
import { Job } from 'agenda';
import { Data365Provider } from '@shared/providers/Data365Provider/implemantatios/Data365Provider';
import PostModel, { IPost } from '@modules/posts/IPostsModel';
import CommentModel, { IComment } from '@modules/comments/ICommentModel';
import { CSVGeneration } from '@shared/utils/ csvGeneration';
import { DayjsDateProvider } from '@shared/providers/DateProvider/implementations/DayjsDateProvider';
export class GetProfileData {
  public async handler(job: Job, done: () => void): Promise<any> {
    const data365Provider = new Data365Provider();

    const profiles = await ProfileModel.find()
    
    const allProfiles: IProfile[] = [];
    const allPosts: IPost[] = [];
    const allComments: IComment[] = [];
    const allProfilesThatCommented: IProfile[] = [] 

    console.log(`Incio do JOB ${new Date()}\n`)
    console.log("Capturando perfis e posts...")
    
    const dayjsDateProvider = new DayjsDateProvider();

    const last_day = dayjsDateProvider.subtractDays(new Date(), 1)

    //profile and posts
    for await (const profile of profiles) {
      try{
        const profileData = await data365Provider.getDataProfile(profile.username)
  
        const newProfile = Object.assign(profile.toObject(), profileData)
  
        await ProfileModel.updateOne(
          {
            _id: profile._id
          },
          {
            ...newProfile
          }
        )
  
        const responsePostsByProfile = await data365Provider.getPostsByProfile({ user: profileData.id, from_date: last_day })
        
        const { items: postsData } = responsePostsByProfile.data

        await PostModel.insertMany(
          postsData,
          { ordered: true }
        )

        allProfiles.push(newProfile)
        allPosts.push(...postsData)
      }catch(error) {
        console.log(`perfil não econtrado ${profile.username}`);
        continue;
      }
    }

    console.log("Captura de perfis e posts finalizada!")
    
    //comments
    console.log("Capturando comentarios...")

    for await (const post of allPosts) {

      try {
        const response = await data365Provider.getCommentsByPost({
          post: post.id,
          from_date: last_day
        })
  
        const { items: comments } = response.data
  
        await CommentModel.insertMany(
          comments,
          { ordered: true }
        )

        allComments.push(...comments)

        for(const comment of comments) {
          await data365Provider.createUpdateTask({ userId: comment.owner_id })
        }
      }catch(error) {
        console.log("error no comments")
        continue;
      }
    }

    console.log("Captura de comentarios finalizada!")

    //Atualização de perfis

    //Perfils que comentaram
    console.log("Capturando perfis que comentaram...")

    // const filterComments = allComments.filter((item, index) => allComments.indexOf(item) === index)
    console.log("Número totla de comentatios hoje: ",allComments.length)
    for await (const comment of allComments) {
      try{
        const profileData = await data365Provider.getDataProfile(comment.owner_id)
  
        profileData.commented_on = comment.id;
        
        if(!allProfilesThatCommented.find(item => item.id === comment.owner_id))
          allProfilesThatCommented.push(profileData)
      }catch(error) {
        console.log("error all comments profile")
        continue;
      }
    }

    console.log("Captura de perfis finalizada!")

    //CSV
    console.log("Construindo csv...")
    
    await CSVGeneration({
      allProfiles,
      allPosts,
      allComments,
      allProfilesThatCommented
    })

    console.log("Arquivos gerados com sucesso!\n")

    console.log(`FIm do JOB ${new Date()}\n`)

    done();
  }
}