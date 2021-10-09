import mongoose, { Model, model, Schema, Document } from 'mongoose';
import { stringRequired, numberRequired } from './schemaFieldTypes';

// export interface CreatorI extends Document {
//   creatorName: String;
//   avatarImage: String;
//   about: String;
//   playCount: Number;
//   likeCount: Number;
//   subscriberCount: Number;
// }

const PodcastCreatorSchema = new Schema({
  creatorName: stringRequired,
  avatarImage: String,
  about: stringRequired,
  audiosPublished: numberRequired,
  playCount: numberRequired,
  subscriberCount: numberRequired,
  contact: String,
  referralCode: stringRequired,
  referrerCode: stringRequired,
  uid: stringRequired,
  email: stringRequired,
});

const PodcastCreatorModel =
  mongoose.models.users || model('users', PodcastCreatorSchema, 'users');

export default PodcastCreatorModel;
