import { IComment } from "@modules/comments/ICommentModel";
import { IPost } from "@modules/posts/IPostsModel";
import { IProfile } from "@modules/profiles/IProfileModel";
import { Parser } from 'json2csv';

export function mappingProfileData (data: IProfile[] | IPost[] | IComment[]) {
  const json2csvParser = new Parser()

  const csvData = json2csvParser.parse(data)

  return csvData
}