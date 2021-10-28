import connect from '../../utils/middleware/mongoClient';
import PodcastCreatorModel from '../../models/podcastCreator';
import { getuserdata } from '../../controllers/getuserdata';
import { findFollower } from '../../utils/findFollower';
import { verifyIdToken } from '../../utils/firebase/firebaseAdmin';

const getFollowers = async (req, res) => {
  if (req.method == 'POST') {
    let userIndex = -1;
    let userid = null;
    try {
      const { email } = await verifyIdToken(req.cookies.token);
      const userdata = await getuserdata(email);
      userid = userdata._id;
    } catch (error) {
      console.log(error);
    }

    try {
      const result = await PodcastCreatorModel.findOne({
        uid: req.body.creatorId,
      });
      if (userid !== null) {
        userIndex = findFollower(result.followers, userid);
      }
      res
        .status(200)
        .json({ followers: result.followers, userIndex: userIndex });
      res.end();
    } catch (err) {
      res.status(405);
      res.end();
    }
  } else {
    res.status(400);
    res.end();
  }
};

export default connect(getFollowers);
