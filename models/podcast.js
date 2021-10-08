import mongoose, { Model, model, Schema, Document } from 'mongoose';
import PodcastCreatorModel from './podcastCreator';

const stringRequired = {
  type: String,
  required: true,
};

const numberRequired = {
  type: Number,
  required: true,
};

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
