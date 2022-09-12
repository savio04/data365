import axios from 'axios';
import crypto from 'crypto';
import { Job } from "agenda";
import { Data365Provider } from "@shared/providers/Data365Provider/implemantatios/Data365Provider";
import { mapPost, mapProfile } from "@shared/utils/mappingFunctions";
import { UserModel } from "@modules/users/IUserModel";
import { StorageProvider } from "@shared/providers/StorageProvider/implemantations/StorageProvider";
import PostModel from '@modules/posts/IPostsModel';

export class GetProfileData {
  public async handler(job: Job, done: () => void): Promise<any> {
    const data365Provider = new Data365Provider();
    const storageProvider = new StorageProvider()

    const profiles = await UserModel.find({ instagramPage: { $exists: true } });

    console.log("Número de Perfis", profiles.length)

    const { FILES_URL } = process.env;

    console.log(`Incio do JOB ${new Date()}\n`);
    console.log("Capturando perfis e posts...");

    //profile and posts
    for await (const profile of profiles) {
      if (profile.instagramPage) {
        try {
          const profileData = await data365Provider.getDataProfile(profile.instagramPage);

          const mappedProfile = mapProfile(profileData);

          const newProfile = Object.assign(profile.toObject(), mappedProfile);

          if (!newProfile.userImage) {
            try {
              const responseProfile = await axios.get(
                newProfile.profielPhotoUrl,
                { responseType: "stream" }
              );
              const id = crypto.randomBytes(20).toString("hex");
              const extension = responseProfile.headers["content-type"]
                .split("/")
                .pop();

              console.log("passou aqui")
              responseProfile.data.pipe(storageProvider.updloadFileStream({ filename: `${id}.${extension}`, folder: "image/profile" }))
              // storageProvider.updloadFile({
              //   filename: `${id}.${extension}`,
              //   folder: "image/profile",
              //   fileContent: responseProfile.data,
              // });

              delete newProfile["profielPhotoUrl"];

              newProfile["userImage"] = `image/profile/${id}.${extension}`;
            } catch (error) {
              console.log(`profile image not found ${profile.instagramPage}`);
              continue;
            }
          }

          await UserModel.updateOne(
            {
              _id: profile._id,
            },
            {
              ...newProfile,
            }
          );

          const responsePostsByProfile = await data365Provider.getPostsByProfile({
            user: newProfile.name,
          });

          const { items: postsData } = responsePostsByProfile.data;

          const mappedPosts = await mapPost(postsData, String(newProfile._id));

          const promises: any[] = []

          for await (const post of mappedPosts) {
            if (post?.mediaDisplayUrls && post.mediaDisplayUrls?.length > 0) {
              const images = [];
              for await (const mediaDisplayUrl of post.mediaDisplayUrls) {
                try {
                  const id = crypto.randomBytes(20).toString("hex");
                  const responseData = await axios.get(mediaDisplayUrl, {
                    responseType: "stream",
                  });
                  
                  const extension = responseData.headers["content-type"]
                    .split("/")
                    .pop();

                  responseData.data.pipe(storageProvider.updloadFileStream({ filename: `${id}.${extension}`, folder: "image/post", }))
                  // promises.push(storageProvider.updloadFile({
                  //   filename: `${id}.${extension}`,
                  //   folder: "image/post",
                  //   fileContent: responseData.data,
                  // }))

                  images.push(`${FILES_URL}/image/post/${id}.${extension}`);
                } catch (error) {
                  continue;
                }
              }

              post["images"] = images;
              delete post["mediaDisplayUrls"];
            }

            if (post.attachedVideUrl) {
              const id = crypto.randomBytes(20).toString("hex");

              try {
                const responseData = await axios.get(post.attachedVideUrl, {
                  responseType: "stream",
                });
                const extension = responseData.headers["content-type"]
                  .split("/")
                  .pop();

                responseData.data.pipe(storageProvider.updloadFileStream({ filename: `${id}.${extension}`, folder: "video/post"}))

                // promises.push(storageProvider.updloadFile({
                //   filename: `${id}.${extension}`,
                //   folder: "video/post",
                //   fileContent: responseData.data,
                // }))

                post["video"] = `${FILES_URL}/video/post/${id}.${extension}`;
                delete post['attachedVideUrl']
              } catch (error) {
                continue;
              }
            }
          }

          console.log(`Novos posts do ${profile.instagramPage}: `, mappedPosts.length)
          await PostModel.insertMany(mappedPosts, { ordered: true });
          Promise.all(promises)
        } catch (error) {
          console.log("error", error);
          console.log(`perfil não econtrado ${profile.instagramPage}`);
          continue;
        }
      }
    }

    console.log("Captura de perfis e posts finalizada!");
    console.log(`Fim do JOB ${new Date()}\n`);
    done();
  }
}
