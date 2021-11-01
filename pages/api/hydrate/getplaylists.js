import connect from '../../../utils/middleware/mongoClient';
import PlaylistModel from '../../../models/playlist';

const getplaylists = async (req, res) => {
  if (req.method == 'GET') {
    const allPlaylists = await PlaylistModel.find({ podcastList: { $ne: [] } })
      .populate('creatorId podcastList')
      .sort({ likeCount: -1 })
      .catch(console.error);
    if (allPlaylists) {
      let temp = JSON.stringify(allPlaylists);
      return res.status(200).json({ playlists: JSON.parse(temp) });
    } else {
      return res.status(200).json({ playlists: [] });
    }
  }
};

export default connect(getplaylists);
