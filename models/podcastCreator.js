import mongoose, { Model, model, Schema, Document } from 'mongoose';

// export interface CreatorI extends Document {
//   creatorName: String;
//   avatarImage: String;
//   about: String;
//   playCount: Number;
//   likeCount: Number;
//   subscriberCount: Number;
// }

const stringRequired = {
  type: String,
  required: true,
};

const numberRequired = {
  type: Number,
  default: 0,
  required: true,
};

const PodcastCreatorSchema = new Schema({
  creatorName: stringRequired,
  avatarImage: stringRequired,
  email: stringRequired,
  uid: stringRequired,
  about: String,
  audiosPublished: numberRequired,
  playCount: numberRequired,
  subscriberCount: numberRequired,
  contact: String,
});

const PodcastCreatorModel =
  mongoose.models.users || model('users', PodcastCreatorSchema, 'users');

export default PodcastCreatorModel;
