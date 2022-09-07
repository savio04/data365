import { PostContentTypes, PostStatus, PostTypes } from "@shared/utils/constants";
import mongoose, { Document } from "mongoose";

export interface IPost {
  id?: any;
  _id?: any;
  authorId: any;
  ownerId: any;
  status: any;
  type: any;
  contentType: any;
  socialId: any;
  title: any;
  body: any;
  images: string[];
  video: any;
  audio: any;
  videoThumbnail: any;
  commentCount: any;
  likesCount: any;
  shareCount: any;
  reportCount: any;
  og: any;
  reports: any;
  likes: any;
  shares: any;
  hashtags: any;
  eventDate: Date;
  eventLink: any;
  eventLocation: any;
  visibleOnFeed: any;
}
interface IIPostDocument extends IPost, Document {}

const PostSchema = new mongoose.Schema<IIPostDocument>(
  {
    authorId: { type: mongoose.Schema.Types.ObjectId, required: true },
    ownerId: { type: mongoose.Schema.Types.ObjectId, required: true },
    status: {
      type: String,
      enum: PostStatus,
      required: true,
      default: PostStatus.Published,
    },
    type: {
      type: String,
      enum: PostTypes,
      required: true,
      default: PostTypes.Regular,
    },
    contentType: {
      type: String,
      enum: PostContentTypes,
      required: true,
      default: PostContentTypes.Regular,
    },
    socialId: { type: String, trim: true },
    title: { type: String, trim: true },
    body: { type: String, trim: true },
    images: [{ type: String, trim: true }],
    video: { type: String, trim: true },
    audio: { type: String, trim: true },
    videoThumbnail: { type: String, trim: true },
    commentCount: { type: Number, default: 0 },
    likesCount: { type: Number, default: 0 },
    shareCount: { type: Number, default: 0 },
    reportCount: { type: Number, default: 0 },
    og: {
      ogLink: String,
      ogImage: String,
      ogTitle: String,
      ogDescription: String,
    },
    reports: {
      type: [mongoose.Schema.Types.ObjectId],
      default: [],
    },
    likes: {
      type: [mongoose.Schema.Types.ObjectId],
      default: [],
    },
    shares: {
      type: [mongoose.Schema.Types.ObjectId],
      default: [],
    },
    hashtags: {
      type: [String],
      default: [],
    },
    eventDate: Date,
    eventLink: { type: String, trim: true },
    eventLocation: { type: String, trim: true },
    visibleOnFeed: {
      type: Boolean,
      default: true,
    },
  },
  {
    strict: true,
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

const PostModel = mongoose.model("posts", PostSchema);

export default PostModel;
