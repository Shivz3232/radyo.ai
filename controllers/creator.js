import connect from '../utils/middleware/mongoClient';
import PodcastCreatorModel from '../models/podcastCreator';

export const getCreatorAudio = async uid => {
  console.log(uid, 'line 5');
  const allAudio = await PodcastCreatorModel.find({
    uid: uid,
  }).catch(console.error);

  if (allAudio) {
    console.log(allAudio, 'line 12');
    let temp = JSON.stringify(allAudio[0]);
    return JSON.parse(temp);
  } else {
    return undefined;
  }
};
export const getCreatorIds = async () => {
  return await PodcastCreatorModel.find({}, 'uid -_id').catch(console.error);
};
