import { IComment } from "@modules/comments/ICommentModel";
import { IPost } from "@modules/posts/IPostsModel";
import { IProfile } from "@modules/profiles/IProfileModel";
import { Parser } from 'json2csv';

export function mappingProfileData (data: IProfile[] | IPost[] | IComment[]) {
  const json2csvParser = new Parser({ excelStrings: true, withBOM: true })

  const csvData = json2csvParser.parse(data)

  return csvData
}

function mapProfile(profile) {
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

async function mapPost(posts, userId) {
  const newPosts = []

  for await (const post of posts) {
    const postAlredyExists = await PostModel.findOne({ socialId: post.id })

    if(!postAlredyExists) {
      newPosts.push(post)
    }
  }

  const postMappeds = []

  for(const post of newPosts) {
    const newPost = {
      authorId: userId,
      ownerId: userId,
      body: post.text,
      // commentCount: post.comments_count,
      // likesCount: post.likes_count,
      mediaDisplayUrls: post.attached_carousel_media_urls ? [...post.attached_carousel_media_urls] : [post.attached_media_display_url],
      attachedVideUrl: post.attached_video_url,
      socialId: post.id
    }

    postMappeds.push(newPost)
  }

  return postMappeds
}