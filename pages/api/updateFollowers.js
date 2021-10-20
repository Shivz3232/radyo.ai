import connect from '../../utils/middleware/mongoClient';
import { verifyIdToken } from '../../utils/firebase/firebaseAdmin';
import nookies from 'nookies';
import PodcastCreatorModel from '../../models/podcastCreator';
import ContestModel from '../../models/contest';

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

      const contests = await ContestModel.find({ active: true })
        .sort({ startDate: -1 })
        .catch(console.error);

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
        let updateFollowers = await PodcastCreatorModel.findOne({
          uid: req.body.creatorId,
        });
        if (updateFollowers && contests) {
          updateFollowers.followers = followers;
          contests.forEach(contest => {
            const updateContest = element =>
              element.contestId.toString() === contest._id.toString();
            const index = updateFollowers.creatorScore.findIndex(updateContest);
            // const startDate = new Date(contest.startDate);
            // const endDate = new Date(contest.endDate);
            // const audioDate = new Date(updateCount.createdAt);
            // const isValidEntry = audioDate <= endDate && audioDate >= startDate;
            const isValidEntry = true;
            // console.log(updateCount.title, 'isValid', isValidEntry);
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
