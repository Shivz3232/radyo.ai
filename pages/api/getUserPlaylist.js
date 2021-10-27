import connect from '../../utils/middleware/mongoClient';
import mongoose from 'mongoose';
import { verifyIdToken } from '../../utils/firebase/firebaseAdmin';
import PlaylistModel from '../../models/playlist';
import PodcastModel from '../../models/podcast';

const getPlaylistFromDB = async uid => {
  let retval = {};
  try {
    retval = await PlaylistModel.find({ creatorId: uid });
    return retval;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const getUserPlaylists = async (req, res) => {
  if (req.method === 'POST') {
    try {
      const { email } = await verifyIdToken(req.cookies.token);
      const uid = email.split('@')[0];
      const retval = await getPlaylistFromDB(uid, req.body.title);
      console.log(retval);
      res.status(200).json({ playlists: retval });
      res.end();
    } catch (error) {
      console.log(error);
      res.status(400).json({ success: false });
      res.end();
    }
  } else {
    res.status(400).json({ success: false });
    res.end();
  }
};

export default connect(getUserPlaylists);
