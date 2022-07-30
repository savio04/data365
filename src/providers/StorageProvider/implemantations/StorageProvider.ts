import { IStorageProvider } from "../IStorageProvider";
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

  async updloadFile (path: string, filename: string) {
    const orignalName = resolve(path)

    const fileContent = await fs.promises.readFile(orignalName)

    const newFile = await this.client.putObject({
      Bucket: `${config.AWS_BUCKET_NAME}/Dados dos perfis`,
      Key: filename,
      ACL: 'private',
      Body: fileContent,
    }).promise()


    await fs.promises.unlink(orignalName)

    return newFile
  }
}