export interface IUploadFileProps {
  folder: string;
  path: string;
  filename: string;
}

export interface IStorageProvider {
  updloadFile: (data: IUploadFileProps) => Promise<any>;
}