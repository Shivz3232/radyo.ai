import mongoose, { Model, model, Schema, Document } from 'mongoose';
import { stringRequired, numberRequired } from './schemaFieldTypes';
import PodcastCreatorModel from './podcastCreator';

const PodcastSchema = new Schema(
  {
    creatorId: {
      type: mongoose.Types.ObjectId,
      ref: PodcastCreatorModel,
    },
    coverImage: stringRequired,
    category: stringRequired,
    title: stringRequired,
    description: stringRequired,
    playCount: numberRequired,
    likeCount: numberRequired,
    shareCount: numberRequired,
    language: {
      type: String,
      enum: ['english', 'hindi'],
      required: true,
    },
    tags: {
      type: [String],
    },
    audioSrc: stringRequired,
    fileSize: String,
    duration: Number,
    audioDescription: String,
    status: {
      type: String,
      enum: ['inreview', 'approved', 'rejected'],
      default: 'inreview',
    },
    reported: {
      type: Number,
      default: 0,
    },
  },
  {
    // TODO : check if date is added automatically when audio is uploaded, not working for manual entry
    timestamps: {
      createdAt: 'createdAt',
    },
  }
);

const PodcastModel =
  mongoose.models.podcast || model('podcast', PodcastSchema, 'podcast');

export default PodcastModel;
