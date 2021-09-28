import connect from '../utils/middleware/mongoClient';
import PodcastCreatorModel from '../models/podcastCreator';

export const getCreatorAudio = async creatorId => {
  const allAudio = await PodcastCreatorModel.find({
    _id: creatorId,
  })
    .sort({ createdAt: -1 })
    .catch(console.error);
  if (allAudio) {
    let temp = JSON.stringify(allAudio[0]);
    return JSON.parse(temp);
  } else {
    return undefined;
  }
};
export const getCreatorIds = async () => {
  return await PodcastCreatorModel.find({}, '_id')
    .limit(100)
    .catch(console.error);
};
