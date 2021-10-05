import mongoose, { Model, model, Schema, Document } from 'mongoose';

const userProfileSchema = new Schema({
  email: String,
  userName: String,
  userId: String,
  about: String,
  contact: Number,
  img: Object,
});

const UserProfileModel =
  mongoose.models.userProfile ||
  model('userProfile', userProfileSchema, 'userProfile');

export default UserProfileModel;
