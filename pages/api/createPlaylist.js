import connect from '../../utils/middleware/mongoClient';
import { verifyIdToken } from '../../utils/firebase/firebaseAdmin';
import PlaylistModel from '../../models/playlist';
import { generateShortId } from '../../utils/generateShortId';
import { getuserdata } from '../../controllers/getuserdata';

const addPlaylistToDB = async (uid, uname, title, audioId) => {
  console.log(uid, uname, title, audioId);
  const playlistObj = new PlaylistModel({
    creatorId: uid,
    creatorName: uname,
    podcastList: audioId ? audioId : [],
    coverImage: '',
    title: title,
    description: '',
    playCount: 0,
    likeCount: 0,
    likedBy: [],
    shareCount: 0,
    shortId: generateShortId(),
  });

  const titleExists = await PlaylistModel.find({ title: title });
  let retval = null;
  if (titleExists.length == 0) {
    try {
      retval = await playlistObj.save();
      console.log('Playlist added', title);
      return 0;
    } catch (err) {
      console.log(err);
      console.log('Failed to add playlist', title);
      return 2;
    }
  } else {
    console.log('Duplicate Playlist Name', title);
    return 1;
  }
};

const createPlaylist = async (req, res) => {
  if (req.method === 'POST') {
    try {
      const { email } = await verifyIdToken(req.cookies.token);
      const uinfo = await getuserdata(email);
      const retval = await addPlaylistToDB(
        uinfo._id,
        uinfo.name,
        req.body.title,
        req.body.audioId
      );
      if (retval === 0) {
        res.status(200).json({ success: true });
        res.end();
      } else if (retval === 1) {
        res.status(200).json({ success: false });
        res.end();
      } else {
        res.status(400).json({ success: false });
        res.end();
      }
    } catch (error) {
      console.log(error);
      res.status(404).json({ success: false });
      res.end();
    }
  } else {
    res.status(405).json({ success: false });
    res.end();
  }
};

export default connect(createPlaylist);
