import mongoose, { Model, model, Schema, Document } from 'mongoose';
import { stringRequired, numberRequired } from './schemaFieldTypes';
import PodcastCreatorModel from './podcastCreator';

const ContestSchema = new Schema({
  name: String,
  url_name: String,
  contest_type: {
    type: String,
    default: '',
    enum: ['month', 'year', 'custom'],
  },
  startDate: Date,
  endDate: Date,
  active: Boolean,
  how_to_participate: String,
  prizes_to_win: String,
  terms_and_conditions: String,
  contest_results: [
    {
      creatorId: String,
      contest_rank: Number,
      creatorName: String,
      creatorScore: Number,
    },
  ],
});

const ContestModel =
  mongoose.models.contests || model('contests', ContestSchema, 'contests');

export default ContestModel;
