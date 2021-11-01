import PlaylistModel from '../models/playlist';

export const getTrendingPlaylists = async () => {
  const trendingPlaylists = await PlaylistModel.find({
    podcastList: { $ne: [] },
  })
    .populate('podcastList')
    .populate('creatorId')
    .sort({ likeCount: -1 })
    .limit(15)
    .catch(console.error);
  if (trendingPlaylists) {
    return JSON.parse(JSON.stringify(trendingPlaylists));
  } else {
    return undefined;
  }
};

export const getAllPlaylists = async () => {
  const allPlaylists = await PlaylistModel.find({ podcastList: { $ne: [] } })
    .populate('creatorId podcastList')
    .sort({ likeCount: -1 })
    .catch(console.error);
  if (allPlaylists) {
    let temp = JSON.stringify(allPlaylists);
    return JSON.parse(temp);
  } else {
    return undefined;
  }
};

export const getUserPlaylists = async uid => {
  const allPlaylists = await PlaylistModel.find({ creatorId: uid })
    .populate('podcastList')
    .populate('creatorId')
    .catch(console.error);
  if (allPlaylists) {
    return JSON.parse(JSON.stringify(allPlaylists));
  } else {
    return [];
  }
};
