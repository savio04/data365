import PostModel from '@modules/posts/IPostsModel';
import { Parser } from 'json2csv';
import { UserStatus, UserTypes } from "./constants";

// export function mappingProfileData (data: IProfile[] | IPost[] | IComment[]) {
//   const json2csvParser = new Parser({ excelStrings: true, withBOM: true })

//   const csvData = json2csvParser.parse(data)

//   return csvData
// }

interface IMapedPosts {
  authorId: string;
  ownerId: string;
  body: string;
  commentCount?: number;
  likesCount?: number;
  mediaDisplayUrls?: string[];
  attachedVideUrl?: string;
  socialId: string;
  images?: string[];
  video?: string;
}

export function mapProfile(profile: any) {
  const profileMapped = {
    name: profile.username,
    realName: profile.full_name,
    description: profile.biography,
    // followersCount: profile.followers_count,
    // followingCount: profile.following_count,
    instagramPage: profile.username,
    locationId: profile.latest_location_id,
    profielPhotoUrl: profile.profile_photo_url,
    userStatus: UserStatus.Incomplete,
    userType: UserTypes.Candidate,
    nomeUrna: profile.full_name
  }

  return profileMapped
}

export async function mapPost(posts: any[], userId: string) {
  const newPosts = []

  for await (const post of posts) {
    const postAlredyExists = await PostModel.findOne({ socialId: post.id })

    if(!postAlredyExists) {
      newPosts.push(post)
    }
  }

  const postMappeds: IMapedPosts[] = []

  for(const post of newPosts) {
    const newPost = {
      authorId: userId,
      ownerId: userId,
      body: post.text,
      // commentCount: post.comments_count,
      // likesCount: post.likes_count,
      mediaDisplayUrls: post.attached_carousel_media_urls ? [...post.attached_carousel_media_urls] : [post.attached_media_display_url],
      attachedVideUrl: post.attached_video_url,
      socialId: post.id,
    }

    postMappeds.push(newPost)
  }

  return postMappeds
}