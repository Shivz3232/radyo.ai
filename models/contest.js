import mongoose, { Model, model, Schema, Document } from 'mongoose';
import { stringRequired, numberRequired } from './schemaFieldTypes';
import PodcastCreatorModel from './podcastCreator';

const ContestSchema = new Schema(
  {
    name: String,
    url_name: String,
    startDate: Date,
    endDate: Date,
    active: Boolean,
    how_to_participate: String,
    prizes_to_win: String,
    terms_and_conditions: String,
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
