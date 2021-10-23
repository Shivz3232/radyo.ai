import mongoose, { Model, model, Schema, Document } from 'mongoose';
import {
  stringRequired,
  numberRequired,
  stringArray,
} from './schemaFieldTypes';
// import ContestModel from './contest';

const PodcastCreatorSchema = new Schema({
  creatorName: stringRequired,
  avatarImage: String,
  cloudinaryId: String,
  about: String,
  audiosPublished: numberRequired,
  audiosPublishedOn: {
    type: [Date],
    default: [],
    required: true,
  },
  playCount: numberRequired,
  subscriberCount: numberRequired,
  contact: String,
  referralCode: stringRequired,
  referrerCode: stringRequired,
  uid: stringRequired,
  email: stringRequired,
  followers: stringArray,
  creatorScore: {
    type: [
      {
        contestId: { type: mongoose.Types.ObjectId },
        score: numberRequired,
      },
    ],
    default: [],
  },
});

const PodcastCreatorModel =
  mongoose.models.users || model('users', PodcastCreatorSchema, 'users');

export default PodcastCreatorModel;
