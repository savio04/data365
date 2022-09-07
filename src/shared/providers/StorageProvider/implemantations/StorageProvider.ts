import { IStorageProvider, IUploadFileProps } from "../IStorageProvider";
import { S3 } from 'aws-sdk';
import { config } from "@config/config";
import { resolve } from 'path'
import fs from 'fs'

export class StorageProvider implements IStorageProvider {

  private client: S3;

  constructor() {
    this.client = new S3({
      region: config.AWS_REGION,
      credentials: {
        secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
        accessKeyId: config.AWS_ACCESS_KEY_ID
      }
    })
  }

  async updloadFile ({ filename, folder, fileContent }: IUploadFileProps) {
    const newFile = await this.client.putObject({
      Bucket: `${config.AWS_BUCKET_NAME}/${folder}`,
      Key: filename,
      ACL: 'private',
      Body: fileContent,
    }).promise()

    return newFile
  }
}