import mongoose, { model, Schema } from 'mongoose';

const subscribedUserSchema = new Schema({
  subscriptionObject: {
    type: Object
  },
});

const SubscribedUserModel =
  mongoose.models.subscribedUsers ||
  model(
    'subscribedUsers',
    subscribedUserSchema,
    'subscribedUsers'
  );

export default SubscribedUserModel;
