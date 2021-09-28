import PodcastModel from '../models/podcast';

export const getAudio = async id => {
  const allAudio = await PodcastModel.find({ _id: id, status: 'approved' })
    .populate('creatorId', 'creatorName', 'users')
    .sort({ createdAt: -1 })
    .catch(console.error);
  if (allAudio) {
    let temp = JSON.stringify(allAudio[0]);
    return JSON.parse(temp);
  } else {
    return undefined;
  }
};
export const getCategoryAudio = async category => {
  const allAudio = await PodcastModel.find({
    category: category,
    status: 'approved',
  })
    .populate('creatorId', 'creatorName', 'users')
    .limit(15)
    .sort({ createdAt: -1 })
    .catch(console.error);
  if (allAudio) {
    let temp = JSON.stringify(allAudio);
    return JSON.parse(temp);
  } else {
    return undefined;
  }
};

export const getAllAudio = async () => {
  const allAudio = await PodcastModel.find({ status: 'approved' })
    .populate('creatorId', 'creatorName', 'users')
    .sort({ createdAt: -1 })
    .limit(150)
    .catch(console.error);
  if (allAudio) {
    let temp = JSON.stringify(allAudio);
    return JSON.parse(temp);
  } else {
    return undefined;
  }
};

export const getAudioCategories = async () => {
  const categories = await PodcastModel.find({}, '-_id category');
  if (categories) {
    let temp = JSON.stringify(categories);
    return JSON.parse(temp);
  } else return [];
};

export const getAudioIds = async () => {
  const ids = await PodcastModel.find({ status: 'approved' }, '_id')
    .limit(100)
    .catch(console.error);
  if (ids) return ids;
  else return undefined;
};
