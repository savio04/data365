import mongoose, { Document } from "mongoose";

export interface IProfile {
  id?: any;
  _id?: any;
  commented_on?: string;
  username: string;
  age_approx: string;
  age_group: string;
  biography: string;
  business_category: string[];
  external_url: string;
  followers_count: number;
  followings_count: number;
  full_name: string;
  gender?: string;
  highlight_reels_count?: number;
  is_business_account: boolean;
  is_joined_recently: boolean;
  is_private: boolean;
  is_verified: boolean;
  langs?: string[];
  latest_location_id: string;
  posts_count?: number;
  profile_photo_url?: string;
  profile_photo_url_hd?: string;
}

interface IProfileDocument extends IProfile, Document {}

const ProfileSchema = new mongoose.Schema<IProfileDocument>(
  {
    id: {
      type: String,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    age_approx: {
      type: String,
    },
    age_group: {
      type: String,
    },
    biography: {
      type: String,
    },
    business_category: {
      type: [String],
    },
    external_url: {
      type: String,
    },
    followers_count: {
      type: Number,
    },
    followings_count: {
      type: Number,
    },
    full_name: {
      type: String,
    },
    gender: {
      type: String,
    },
    highlight_reels_count: {
      type: Number,
    },
    is_business_account: {
      type: Boolean,
    },
    is_joined_recently: {
      type: Boolean,
    },
    is_private: {
      type: Boolean,
    },
    is_verified: {
      type: Boolean,
    },
    langs: {
      type: [String],
    },
    latest_location_id: {
      type: String,
    },
    posts_count: {
      type: Number,
    },
    profile_photo_url: {
      type: String,
    },
    profile_photo_url_hd: {
      type: String,
    },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
    collection: "profiles",
  }
);

const ProfileModel = mongoose.model(
  'profiles',
  ProfileSchema,
);

export default ProfileModel;
