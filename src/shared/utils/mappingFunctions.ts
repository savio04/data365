import { IProfile } from "@modules/profiles/IProfileModel";
import { Parser } from 'json2csv';

export function mappingProfileData (profiles: IProfile[]) {
  const json2csvParser = new Parser()

  const csvData = json2csvParser.parse(profiles)

  return csvData
}