import { UserStatus, UserTypes } from "@shared/utils/constants";
import mongoose, { Document, Model } from "mongoose";

export interface IUser {
  _i?: any;
  id?: any;
  nomeUrna: string,
  name: string;
  email: string;
  phone: string;
  phoneValidated: boolean;
  dob: Date,
  userImage: any;
  facebookId: any;
  facebookToken: any;
  googleId: any;
  googleToken: any;
  googleIdToken: any;
  userStatus: any;
  userType: any;
  statusCommerce: any;
  country: any;
  state: any;
  city: any;
  street: any;
  streetNumber: any;
  neighborhood: any;
  zipCode: any;
  district: any;
  yob: any,
  devicesIds: any;
  lsOnline: any;
  dailyNotification: any;
  interactionsNotification: any;
  notifications: any;
  lsNotifications: any;
  validated: any;
  cpfData: any;
  adsBlocked: any;
  pagesBlocked: any;
  chatRooms: any;
  referralCode: any;

  // Page
  realName: any;
  image: any;
  party: any;
  coalition: any;
  description: any;
  cnpj: any;
  cpf: any;
  houseId: any;
  preCandidate: any;
  elected: any;
  deleted: any;
  secondRound: any;
  ownerId: any;
  invitedBy: any;
  admins: any;
  leaders: any;
  followers: any;
  groups: any;
  liveRecorded: any;
  followersCount: any;
  followingCount: any;
  facebook: any;
  electoralFund: any;
  instagramPage: any;
  twitterPage: any;
  number: any;
  premium: any;
  maxAdsDay: any;
  maxAds: any;
  adsCount: any;
  condition: any;
  registration: any;
  tseUrl: any;
  education: any;
  occupation: any;
  birthday: any;
  slogan: any;
  biography: any;
  donationLink: any;
  institutionalVideo: any;
  institutionalVideoThumb: any;
  messageCount: any;
  invites: any;
  verifyImages: any;
  comercialName: any;
  personalId: any;
  website: any;
  whatsapp: any;
  interests: any;
  audience: any;
}

interface IUserDocument extends IUser, Document {}

const UserSchema = new mongoose.Schema<IUserDocument>(
  {
    name: { type: String, trim: true },
    nomeUrna: { type: String, trim: true },
    email: {
      type: String,
      index: true,
      trim: true,
    },
    phone: {
      type: String,
      sparse: true,
      unique: true,
    },
    phoneValidated: {
      type: Boolean,
      default: false,
    },
    dob: Date,
    userImage: { type: String, trim: true },
    facebookId: { type: String, trim: true },
    facebookToken: { type: String, trim: true },
    googleId: { type: String, trim: true },
    googleToken: { type: String, trim: true },
    googleIdToken: { type: String, trim: true },
    userStatus: {
      type: String,
      enum: Object.values(UserStatus),
      required: true,
      default: UserStatus.Incomplete,
    },
    userType: {
      type: String,
      enum: Object.values(UserTypes),
      required: true,
      default: UserTypes.Candidate,
    },
    statusCommerce: {
      type: String,
      default: null,
    },
    country: { type: String, trim: true, lowercase: true },
    state: { type: String, trim: true, uppercase: true },
    city: { type: String, trim: true },
    street: { type: String, trim: true },
    streetNumber: { type: String, trim: true },
    neighborhood: { type: String, trim: true },
    zipCode: { type: String, trim: true },
    district: { type: String, trim: true },
    yob: { type: String, trim: true },
    devicesIds: [{ type: String, trim: true }],
    lsOnline: {
      type: Date,
      default: new Date(),
    },
    dailyNotification: {
      type: Boolean,
      default: true,
    },
    interactionsNotification: {
      type: Boolean,
      default: true,
    },
    notifications: {
      type: Boolean,
      default: true,
    },
    lsNotifications: {
      type: Date,
      default: new Date(),
    },
    validated: {
      type: Boolean,
      default: false,
    },
    cpfData: {
      number: { type: String, trim: true },
      name: { type: String, trim: true },
      dob: { type: String, trim: true },
      status: { type: String, trim: true },
      regData: { type: String, trim: true },
      verifyDigit: { type: String, trim: true },
      receipt: { type: String, trim: true },
      receiptDate: { type: String, trim: true },
    },
    adsBlocked: {
      type: [mongoose.Schema.Types.ObjectId],
      default: [],
    },
    pagesBlocked: {
      type: [mongoose.Schema.Types.ObjectId],
      default: [],
    },
    chatRooms: {
      type: [mongoose.Schema.Types.ObjectId],
      default: [],
    },
    referralCode: { type: String, trim: true },

    // Page
    realName: { type: String, trim: true },
    image: { type: String, trim: true },
    party: { type: String, trim: true },
    coalition: { type: String, trim: true },
    description: { type: String, trim: true },
    cnpj: { type: String, trim: true },
    cpf: { type: String, trim: true },
    houseId: { type: String, trim: true },
    preCandidate: {
      type: Boolean,
      default: false,
    },
    elected: {
      type: Boolean,
      required: true,
      default: false,
    },
    deleted: {
      type: Boolean,
      required: true,
      default: false,
    },
    secondRound: {
      type: Boolean,
      default: false,
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    invitedBy: {
      type: mongoose.Schema.Types.ObjectId,
    },
    admins: {
      type: [mongoose.Schema.Types.ObjectId],
      default: [],
    },
    leaders: {
      type: [mongoose.Schema.Types.ObjectId],
      default: [],
    },
    followers: {
      type: [mongoose.Schema.Types.ObjectId],
      default: [],
    },
    groups: {
      type: [mongoose.Schema.Types.ObjectId],
      default: [],
    },
    liveRecorded: {
      _id: { type: mongoose.Schema.Types.ObjectId, trim: true },
      url: { type: String, trim: true },
      startedAt: { type: Date },
      finishedAt: { type: Date },
      hasLive: { type: Boolean, default: false }
    },
    followersCount: {
      type: Number,
      default: 0,
    },
    followingCount: {
      type: Number,
      default: 0,
    },
    facebook: {
      page: { type: String, trim: true },
      nextPosts: { type: String, trim: true },
    },
    electoralFund: {
      type: Boolean,
      required: false,
      default: false,
    },
    instagramPage: { type: String, trim: true },
    twitterPage: { type: String, trim: true },
    number: { type: String, trim: true },
    premium: { type: Boolean, default: false },
    maxAdsDay: { type: Number, default: 0 },
    maxAds: { type: Number, default: 0 },
    adsCount: { type: Number, default: 0 },
    condition: { type: String, trim: true },
    registration: { type: String, trim: true },
    tseUrl: { type: String, trim: true },
    education: { type: String, trim: true },
    occupation: { type: String, trim: true },
    birthday: Date,
    slogan: { type: String, trim: true },
    biography: { type: String, trim: true, maxlength: 120 },
    donationLink: { type: String, trim: true },
    institutionalVideo: { type: String, trim: true },
    institutionalVideoThumb: { type: String, trim: true },
    messageCount: { type: Number, default: 0 },
    invites: {
      type: [mongoose.Schema.Types.ObjectId],
      default: [],
    },
    verifyImages: {
      type: [String],
      default: [],
    },
    // Comercial

    comercialName: {
      type: String,
      trim: true,
    },
    personalId: {
      type: mongoose.Schema.Types.ObjectId,
      trim: true,
    },
    website: {
      type: String,
      trim: true,
    },
    whatsapp: {
      type: String,
      trim: true,
    },
    interests: {
      type: [mongoose.Schema.Types.ObjectId],
      default: [],
    },
    audience: {
      interests: {
        type: [mongoose.Schema.Types.ObjectId],
        default: [],
      },
      cities: {
        type: [String],
        default: [],
      },
      ufs: {
        type: [String],
        default: [],
      },
      country: {
        type: [String],
        default: [],
      },
      minAge: { type: Number, trim: true },
      maxAge: { type: Number, trim: true },
      selectedLocality: { type: [String] }
    },
  },
  {
    strict: true,
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    }
  },
);

export const UserModel: Model<IUserDocument> = mongoose.model('User', UserSchema);