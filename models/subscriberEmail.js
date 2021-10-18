import mongoose, { Model, model, Schema, Document } from 'mongoose';

const stringRequired = {
  type: String,
  required: true,
};

const SubscriberEmailSchema = new Schema(
  { email: stringRequired },
  { timestamps: { createdAt: 'createdAt' } }
);

const SubscriberEmailModel =
  mongoose.models.subscribers ||
  model('subscribers', SubscriberEmailSchema, 'subscribers');

export default SubscriberEmailModel;
