import connect from '../../utils/middleware/mongoClient';
import { verifyIdToken } from '../../utils/firebase/firebaseAdmin';
import PlaylistModel from '../../models/playlist';
import { getuserdata } from '../../controllers/getuserdata';

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
      const uinfo = await getuserdata(email);
      const retval = await getPlaylistFromDB(uinfo._id, req.body.title);
      res.status(200).json({ playlists: retval });
      res.end();
    } catch (error) {
      console.log(error);
      res.status(400).json({ playlists: [] });
      res.end();
    }
  } else {
    res.status(400).json({ playlists: [] });
    res.end();
  }
};

export default connect(getUserPlaylists);
