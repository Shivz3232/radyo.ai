import connect from '../../utils/middleware/mongoClient';
import { verifyIdToken } from '../../utils/firebase/firebaseAdmin';
import PlaylistModel from '../../models/playlist';

const addAudioToPlaylist = async (uid, plid, audioId) => {
  console.log(uid, plid, audioId);
  const updatestatus = await PlaylistModel.findOneAndUpdate(
    { _id: plid },
    { $push: { podcastList: audioId } }
  );
};

const addToPlaylist = async (req, res) => {
  if (req.method === 'POST') {
    try {
      const { email } = await verifyIdToken(req.cookies.token);
      const uid = email.split('@')[0];
      const retval = await addAudioToPlaylist(
        uid,
        req.body.plid,
        req.body.audioId
      );
      res.status(200).json({ success: true });
      res.end();
    } catch (error) {
      console.log(error);
      res.status(404).json({ success: false });
      res.end();
    }
  } else {
    res.status(400).json({ success: false });
    res.end();
  }
};

export default connect(addToPlaylist);
