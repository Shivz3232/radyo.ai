import mongoose, { Model, model, Schema, Document } from 'mongoose';
import { stringRequired, numberRequired } from './schemaFieldTypes';
import PodcastCreatorModel from './podcastCreator';
import { generateShortId } from '../utils/generateShortId';

const PodcastSchema = new Schema(
  {
    creatorId: {
      type: mongoose.Types.ObjectId,
      ref: PodcastCreatorModel,
    },
    coverImage: stringRequired,
    creatorName: stringRequired,
    category: stringRequired,
    title: stringRequired,
    description: String,
    playCount: numberRequired,
    likeCount: numberRequired,
    likedBy: {
      type: [
        {
          userId: String,
        },
      ],
      default: [],
      required: true,
    },
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
    reportedBy: {
      type: [
        {
          userId: String,
          reportText: String,
        },
      ],
      default: [],
      required: true,
    },
    shortId: {
      type: String,
      default: () => generateShortId(),
    }
  },
  {
    timestamps: {
      createdAt: 'createdAt',
    },
  }
);

const PodcastModel =
  mongoose.models.podcast || model('podcast', PodcastSchema, 'podcast');

export default PodcastModel;
