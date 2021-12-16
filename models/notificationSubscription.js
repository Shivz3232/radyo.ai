import mongoose, { Model, model, Schema, Document } from 'mongoose';
import { PushSubscription } from 'web-push';

const subscribedUserSchema = new Schema<Subscription>({
  subscriptionObject: PushSubscription,
});

const SubscribedUserModel =
  mongoose.models.subscribedUsers ||
  model(
    'subscribedUsers',
    subscribedUserSchema,
    'subscribedUsers'
  );

export default SubscribedUserModel;
