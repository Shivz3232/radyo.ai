import connect from '../utils/middleware/mongoClient';
import PodcastCreatorModel from '../models/podcastCreator';

export const getCreatorAudio = async uid => {
  const allAudio = await PodcastCreatorModel.find({
    uid: uid,
  }).catch(console.error);

  if (allAudio) {
    let temp = JSON.stringify(allAudio[0]);
    return JSON.parse(temp);
  } else {
    return undefined;
  }
};

export const getTrendingCreators = async () => {
  const trendingCreator = await PodcastCreatorModel.find({})
    .sort({ audiosPublished: -1 })
    .catch(console.error);
  if (trendingCreator) {
    let temp = JSON.stringify(trendingCreator);
    return JSON.parse(temp);
  } else {
    return [];
  }
};

export const getCreatorIds = async () => {
  return await PodcastCreatorModel.find({}, 'uid -_id').catch(console.error);
};
