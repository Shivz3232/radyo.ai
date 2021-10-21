import connect from '../../utils/middleware/mongoClient';
import { verifyIdToken } from '../../utils/firebase/firebaseAdmin';
import nookies from 'nookies';
import PodcastCreatorModel from '../../models/podcastCreator';
import ContestModel from '../../models/contest';
import { findFollower } from '../../utils/findFollower';

const removeFollower = (followers, followerIndex) => {
  followers.splice(followerIndex, 1);
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

      const contests = await ContestModel.find({ active: true })
        .sort({ startDate: -1 })
        .catch(console.error);

      const followerIndex = findFollower(followers, uid);
      if (req.body.action === 'FOLLOW' && followerIndex === -1) {
        console.log(uid, 'Following', req.body.creatorId);
        followers.push({ uid: uid, timestamp: new Date().getTime() });
        triggerDbUpdate = true;
      } else if (req.body.action === 'UNFOLLOW' && followerIndex >= 0) {
        console.log(uid, 'Unfollowing', req.body.creatorId);
        followers = removeFollower(followers, followerIndex);
        triggerDbUpdate = true;
      }
      if (triggerDbUpdate) {
        let updateFollowers = await PodcastCreatorModel.findOne({
          uid: req.body.creatorId,
        });
        if (updateFollowers && contests) {
          updateFollowers.followers = followers;
          contests.forEach(contest => {
            const updateContest = element =>
              element.contestId.toString() === contest._id.toString();
            const index = updateFollowers.creatorScore.findIndex(updateContest);
            const isValidEntry = true;
            if (isValidEntry) {
              if (index === -1) {
                updateFollowers.creatorScore.push({
                  contestId: contest._id,
                  score: 1,
                });
              } else if (index !== -1) {
                if (req.body.action === 'FOLLOW')
                  updateFollowers.creatorScore[index].score += 1;
                else if (req.body.action === 'UNFOLLOW')
                  updateFollowers.creatorScore[index].score -= 1;
              }
            }
          });
          updateFollowers.save().catch(console.error);
        }
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
