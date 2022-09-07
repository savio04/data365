import { config } from '@config/config';
import axios, { AxiosInstance } from 'axios'
import { APIS } from '@shared/utils/constants';
import { ICreateTask, IData365Provider, IGetPostsByProfile } from "../IData365Provider";


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
            load_comments: 1
          }
        }
      )

      return response.data
    }catch(error) {
      console.log("error", error)
    }
  }

  async  getCommentsByPost(post: string) {
    try {
      const response = await this.api.get(`/${APIS.INSTAGRAM}/post/${post}/comments`, { 
        params: {
          access_token: config.DATA_365_ACCESS_TOKEN,
          max_page_size: 100,
          order_by: 'date_desc'
        }
      })

      return response.data
    }catch(error) {
      console.log("error", error)
    }
  }

  async getPostsByProfile({ user }: IGetPostsByProfile) {
    try {
      const response = await this.api.get(`/${APIS.INSTAGRAM}/profile/${user}/feed/posts`, { 
        params: {
          access_token: config.DATA_365_ACCESS_TOKEN,
          order_by: 'date_desc',
          max_page_size: 10
        }
      })

      return response.data
    }catch(error) {
      console.log("error", error)
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
      console.log("error", error)
    }
  }
}