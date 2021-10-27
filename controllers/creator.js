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
  const trendingCreator = await PodcastCreatorModel.find({}).catch(
    console.error
  );
  if (trendingCreator) {
    let array = trendingCreator
      .sort((a, b) => {
        let la = 0,
          lb = 0;
        a.audiosPublishedOn.forEach(elem => {
          const current = new Date();
          current.setDate(current.getDate() - 30);
          if (new Date(elem) > current) {
            la++;
          }
        });
        b.audiosPublishedOn.forEach(elem => {
          const current = new Date();
          current.setDate(current.getDate() - 30);
          if (new Date(elem) > current) {
            lb++;
          }
        });
        if (la === lb) {
          return a.playCount < b.playCount ? 1 : -1;
        }
        return la < lb ? 1 : -1;
      })
      .splice(0, 15);
    let temp = JSON.stringify(array);
    return JSON.parse(temp);
  } else {
    return [];
  }
};

export const getCreatorIds = async () => {
  return await PodcastCreatorModel.find({}, 'uid -_id').catch(console.error);
};
