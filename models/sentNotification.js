import mongoose, { model, Schema } from 'mongoose';

const sentNotificationSchema = new Schema({
  sentBy: {
    type: String,
  },
  podcastId: {
    type: String,
  },
  sentDate: {
    type: Date,
  },
  clickCount: {
    type: Number,
  },
});

const SentNotificationModel =
  mongoose.models.sentNotifications ||
  model(
    'sentNotifications',
    sentNotificationSchema,
    'sentNotifications'
  );

export default SentNotificationModel;
