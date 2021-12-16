import mongoose, { model, Schema } from 'mongoose';

const sentNotificationSchema = new Schema({
  sentBy: {
    type: String,
  },
  news_id: {
    type: String,
  },
  sent_date: {
    type: Date,
  },
  click_count: {
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
