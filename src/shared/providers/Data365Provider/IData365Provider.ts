export interface ICreateTask {
  username: string;
  userId?: string;
}

export interface IData365Provider {
  createUpdateTask: (data: ICreateTask) => Promise<any>;
  getDataProfile: (user: string) => Promise<any>;
  getCommentsByPost: (post: string) => Promise<any>;
}