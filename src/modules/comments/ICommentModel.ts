import mongoose, { Mongoose } from "mongoose";

export interface IComment {
  _id?: any;
  id?: any;
  // username?: string;
  comments_count: Number;
  created_time: String;
  likes_count: Number;
  owner_id: String;
  parent_id: String;
  text: String;
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