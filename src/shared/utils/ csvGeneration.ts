import { IComment } from "@modules/comments/ICommentModel";
import { IPost } from "@modules/posts/IPostsModel";
import { IProfile } from "@modules/profiles/IProfileModel";
import fs from "fs";
import { mappingProfileData } from "./mappingFunctions";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { StorageProvider } from "@shared/providers/StorageProvider/implemantations/StorageProvider";

interface ICSVGenerationPros {
  allProfiles: IProfile[];
  allPosts: IPost[];
  allComments: IComment[];
  allProfilesThatCommented: IProfile[];
}

export async function CSVGeneration({
  allProfiles,
  allPosts,
  allComments,
  allProfilesThatCommented
}: ICSVGenerationPros) {
  dayjs.extend(utc);
  dayjs.extend(timezone);

  const csvProfiles = mappingProfileData(allProfiles);
  const csvPosts = mappingProfileData(allPosts);
  const csvComments = mappingProfileData(allComments);
  const csvProfilesThatCommented = mappingProfileData(allProfilesThatCommented);

  const filename = dayjs().utc().local().format(`DD_MM_YYYY-HH:mm`);

  const storageProvider = new StorageProvider();

  //Profiles
  fs.writeFile(`temp/${filename}.csv`, csvProfiles, "utf-8", (error) => {
    if (error) console.log("error", error);
  });

  await storageProvider.updloadFile({
    filename: `profiles_${filename}.csv`,
    folder: "Dados dos perfis",
    path: `temp/${filename}.csv`,
  });

  //Posts
  fs.writeFile(`temp/${filename}.csv`, csvPosts, "utf-8", (error) => {
    if (error) console.log("error", error);
  });

  await storageProvider.updloadFile({
    filename: `posts_${filename}.csv`,
    folder: "Dados dos posts",
    path: `temp/${filename}.csv`,
  });

  //Comments
  fs.writeFile(`temp/${filename}.csv`, csvComments, "utf-8", (error) => {
    if (error) console.log("error", error);
  });

  await storageProvider.updloadFile({
    filename: `comments_${filename}.csv`,
    folder: "Dados dos comentarios",
    path: `temp/${filename}.csv`,
  });

  //ProfilesThatCommented
  fs.writeFile(
    `temp/${filename}.csv`,
    csvProfilesThatCommented,
    "utf-8",
    (error) => {
      if (error) console.log("error", error);
    }
  );

  await storageProvider.updloadFile({
    filename: `profiles_that_commented_${filename}.csv`,
    folder: "Dados dos perfis que comentaram",
    path: `temp/${filename}.csv`,
  });
}
