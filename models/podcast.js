import mongoose, { Model, model, Schema, Document } from 'mongoose';
import PodcastCreatorModel from './podcastCreator';

// export interface PodcastI {
//DONE TODO : uncomment when api is used
// export interface PodcastI extends Document {
//   _id: string;
//   creatorId: any;
//   coverImage: string;
//   category: string;
//   title: string;
//   description: string;
//   audioSrc: string;
//   fileSize: string;
//   duration: number;
//   playCount: number;
//   likeCount: number;
//   shareCount: number;
//   createdAt: Date;
//   language: string;
//   tags: string[];
//   // DONE TODO : change status type after api has been used
//   status: 'inreview' | 'approved' | 'rejected';
//   // status: string;
// }

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
