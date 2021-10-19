import connect from '../../utils/middleware/mongoClient';
import { verifyIdToken } from '../../utils/firebase/firebaseAdmin';
import nookies from 'nookies';
import PodcastCreatorModel from '../../models/podcastCreator';

const findFollower = (followers, uid) => {
  const index = followers.indexOf(uid);
  if (index === -1) {
    return false;
  }
  return true;
};

const removeFollower = (followers, uid) => {
  followers.splice(followers.indexOf(uid), 1);
  return followers;
};

const getFollowerList = async creatorId => {
  const { followers } = (await PodcastCreatorModel.find({ uid: creatorId }))[0];
  return followers;
};

const updateFollowers = async (req, res) => {
  if (req.method === 'POST') {
    try {
      const { email } = await verifyIdToken(req.cookies.token);
      const uid = email.split('@')[0];
      let followers = await getFollowerList(req.body.creatorId);
      let triggerDbUpdate = false;

      if (req.body.action === 'FOLLOW' && !findFollower(followers, uid)) {
        console.log(uid, 'Following', req.body.creatorId);
        followers.push(uid);
        triggerDbUpdate = true;
      } else if (
        req.body.action === 'UNFOLLOW' &&
        findFollower(followers, uid)
      ) {
        console.log(uid, 'Unfollowing', req.body.creatorId);
        followers = removeFollower(followers, uid);
        triggerDbUpdate = true;
      }
      if (triggerDbUpdate) {
        let updateFollowers = await PodcastCreatorModel.updateOne(
          { uid: req.body.creatorId },
          {
            followers: followers,
          }
        );
      }
      res.status(201).json({ success: true, followers: followers });
      res.end();
    } catch (error) {
      console.log(error);
      res.status(400).json({ success: false });
      res.end();
    }
  }
};

export default connect(updateFollowers);
