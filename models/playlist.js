import mongoose, { Model, model, Schema, Document } from 'mongoose';
import { stringRequired, numberRequired } from './schemaFieldTypes';
import PodcastModel from './podcast';
import PodcastCreatorSchema from './podcastCreator';
import { generateShortId } from '../utils/generateShortId';

const PlaylistSchema = new Schema({
  creatorId: {
    type: Schema.Types.ObjectId,
    ref: PodcastCreatorSchema,
  },
  podcastList: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: PodcastModel,
      },
    ],
    default: [],
  },
  coverImage: String,
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
  shortId: {
    type: String,
    default: () => generateShortId(),
  },
});

const PlaylistModel =
  mongoose.models.playlists || model('playlists', PlaylistSchema, 'playlists');

export default PlaylistModel;
