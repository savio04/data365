import mongoose, { Mongoose } from "mongoose";

export interface IComment {
  _id?: any;
  id?: any;
  comments_count: Number;
  created_time: string;
  likes_count: Number;
  owner_id: string;
  parent_id: string;
  text: string;
  timestamp: Number;
}


interface ICommentDocument extends IComment, Document {}

const CommentSchema = new mongoose.Schema<ICommentDocument>(
  {
    // username: {
    //   type: String,
    //   unique: true,
    // },
    id: {
      type: String,
    },
    comments_count: {
      type: Number,
    },
    created_time: {
      type: String,
    },
    likes_count: {
      type: Number,
    },
    owner_id: {
      type: String,
    },
    parent_id: {
      type: String,
    },
    text: {
      type: String,
    },
    timestamp: {
      type: Number,
    }
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
    collection: "comments",
  }
);

const CommentModel = mongoose.model("comments", CommentSchema);

export default CommentModel;