export interface IStorageProvider {
  updloadFile: (path: string, filename: string) => Promise<any>;
}