import connect from '../../../utils/middleware/mongoClient';
import PlaylistModel from '../../../models/playlist';
import { verifyIdToken } from '../../../utils/firebase/firebaseAdmin';

const removeAudioFromPlaylist = async (req, res) => {
  if (req.method == 'POST') {
    const { email } = await verifyIdToken(req.cookies.token);
    const playlistId = req.query.PlaylistId;
    const audioId = req.body.AudioId;
    const updateresult = await PlaylistModel.findOneAndUpdate(
      { _id: playlistId },
      {
        $pull: { podcastList: audioId },
      }
    )
      .then(res.status(200).end())
      .catch(res.status(400).end());
  } else {
    res.status(405);
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.end();
  }
};

export default connect(removeAudioFromPlaylist);
