import mongoose, { Model, model, Schema, Document } from 'mongoose';
import { stringRequired, numberRequired } from './schemaFieldTypes';
import PodcastCreatorModel from './podcastCreator';

const ContestSchema = new Schema(
  {
    name: String,
    startDate: Date,
    endDate: Date,
    active: Boolean,
    // winner: {
    //   type: mongoose.Types.ObjectId,
    //   ref: PodcastCreatorModel,
    // },
    // topScorers: [
    //   {
    //     creatorId: {
    //       type: mongoose.Types.ObjectId,
    //       ref: PodcastCreatorModel,
    //     },
    //   },
    // ],
  },
  {
    timestamps: {
      createdAt: 'createdAt',
    },
  }
);

const ContestModel =
  mongoose.models.contests || model('contests', ContestSchema, 'contests');

export default ContestModel;
