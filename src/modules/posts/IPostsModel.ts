import mongoose, { Document } from "mongoose";

export interface IPost {
  id?: any;
  _id?: any;
  attached_carousel_media_urls: string[];
  attached_media_content: string[];
  attached_media_display_url: string;
  attached_media_tagged_users: string[];
  attached_video_url: string;
  comments_count: number;
  created_time: string;
  is_comments_disabled: boolean;
  is_video: boolean;
  likes_count: number;
  location_id: string;
  owner_id: string;
  product_type: string;
  related_posts: string[];
  shortcode: string;
  sponsors: string[];
  text: string;
  text_lang: string;
  text_tagged_users: string[];
  text_tags: string[];
  timestamp: number;
  video_plays_count: number;
  video_views_count: number;
  posts?: IPost[];
}

interface IIPostDocument extends IPost, Document {}

const PostSchema = new mongoose.Schema<IIPostDocument>(
  {
    id: {
      type: String,
    },
    attached_carousel_media_urls: {
      type: [String],
    },
    attached_media_content: {
      type: [String],
    },
    attached_media_display_url: {
      type: String,
    },
    attached_media_tagged_users: {
      type: [String],
    },
    attached_video_url: {
      type: String,
    },
    comments_count: {
      type: Number,
    },
    created_time: {
      type: String,
    },
    is_comments_disabled: {
      type: Boolean,
    },
    is_video: {
      type: Boolean,
    },
    likes_count: {
      type: Number,
    },
    location_id: {
      type: String,
    },
    owner_id: {
      type: String,
    },
    product_type: {
      type: String,
    },
    related_posts: {
      type: [String],
    },
    shortcode: {
      type: String,
    },
    sponsors: {
      type: [String],
    },
    text: {
      type: String,
    },
    text_lang: {
      type: String,
    },
    text_tagged_users: {
      type: [String],
    },
    text_tags: {
      type: [String],
    },
    timestamp: {
      type: Number,
    },
    video_plays_count: {
      type: Number,
    },
    video_views_count: {
      type: Number,
    },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
    collection: "posts",
  }
);

const PostModel = mongoose.model("posts", PostSchema);

export default PostModel;
