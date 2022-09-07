import { config } from '@config/config';
import axios, { AxiosInstance } from 'axios'
import { APIS } from '@shared/utils/constants';
import { ICreateTask, IData365Provider, IGetCommentsByPost, IGetPostsByProfile } from "../IData365Provider";


export class Data365Provider implements IData365Provider {
  private api: AxiosInstance;

  constructor(){
    this.api = axios.create({
      baseURL: config.DATA_365_URL
    })
  }
  
  async createUpdateTask (data: ICreateTask) {
    try {
      const response = await this.api.post(
        `/${APIS.INSTAGRAM}/profile/${data.username || data.userId}/update`, 
        null, 
        {
          params: {
            access_token: config.DATA_365_ACCESS_TOKEN,
            load_feed_posts: 1,
            load_comments: 1,
            auto_update_interval: 10800 //segundos
          }
        }
      )

      return response.data
    }catch(error) {
      console.log("error", error)
      console.log("ERROR")
    }
  }

  async  getCommentsByPost({ post, from_date }: IGetCommentsByPost) {
    try {
      const response = await this.api.get(`/${APIS.INSTAGRAM}/post/${post}/comments`, { 
        params: {
          access_token: config.DATA_365_ACCESS_TOKEN,
          from_date,
          order_by: 'date_desc'
        }
      })

      return response.data
    }catch(error) {
      console.log("ERROR")
    }
  }

  async getPostsByProfile({ user, from_date }: IGetPostsByProfile) {
    try {
      const response = await this.api.get(`/${APIS.INSTAGRAM}/profile/${user}/feed/posts`, { 
        params: {
          access_token: config.DATA_365_ACCESS_TOKEN,
          from_date,
          order_by: 'date_desc'
        }
      })

      return response.data
    }catch(error) {
      console.log("ERROR")
    }
  }

  async getDataProfile (user: string) {
    try {
      const responseProfileData = await this.api.get(`/${APIS.INSTAGRAM}/profile/${user}`, { 
        params: {
          access_token: config.DATA_365_ACCESS_TOKEN,
        }
      })

      const { data: profileData } = responseProfileData.data
      
      return profileData
    }catch(error) {
      console.log("ERROR")
    }
  }
}