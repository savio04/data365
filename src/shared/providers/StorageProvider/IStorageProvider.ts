export interface IUploadFileProps {
  folder: string;
  fileContent: Buffer;
  filename: string;
}

export interface IStorageProvider {
  updloadFile: (data: IUploadFileProps) => Promise<any>;
}