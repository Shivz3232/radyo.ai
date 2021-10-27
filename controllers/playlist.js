import PlaylistModel from '../models/playlist';

export const getAllPlaylists = async () => {
  const allPlaylists = await PlaylistModel.find({ podcastList: { $ne: [] } })
    .sort({ likeCount: -1 })
    .limit(15)
    .populate('podcastList')
    .catch(console.error);
  if (allPlaylists) {
    return JSON.parse(JSON.stringify(allPlaylists));
  } else {
    return undefined;
  }
};
