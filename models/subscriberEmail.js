import mongoose, { model, Schema } from 'mongoose';

const stringRequired = {
  type: String,
  required: true,
};

const SubscriberEmailSchema = new Schema(
  {
    email: stringRequired,
  },
  {
    timestamps: {
      createdAt: 'createdAt',
    },
  }
);

const SubscriberEmailModel =
  mongoose.models.subscribers ||
  model('subscribers', SubscriberEmailSchema, 'subscribers');

export default SubscriberEmailModel;
