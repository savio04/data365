export interface ICreateTask {
  username: string;
  userId?: string;
}

export interface IGetPostsByProfile {
  user: string;
  from_date: Date;
}
export interface IData365Provider {
  createUpdateTask: (data: ICreateTask) => Promise<any>;
  getDataProfile: (user: string) => Promise<any>;
  getPostsByProfile: (data: IGetPostsByProfile) => Promise<any>;
  getCommentsByPost: (post: string) => Promise<any>;
}