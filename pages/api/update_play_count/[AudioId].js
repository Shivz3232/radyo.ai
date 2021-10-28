import connect from '../../../utils/middleware/mongoClient';
import PodcastModel from '../../../models/podcast';
import PodcastCreatorModel from '../../../models/podcastCreator';
import ContestModel from '../../../models/contest';
import PlaylistModel from '../../../models/playlist';
import { verifyIdToken } from '../../../utils/firebase/firebaseAdmin';

const updatePlayCount = async (req, res) => {
  if (req.method == 'POST') {
    const id = req.query.AudioId;
    if (req.body.collection === 'playlist') {
      await PlaylistModel.findOneAndUpdate(
        { _id: id },
        {
          $inc: { playCount: 1 },
        }
      ).catch(console.error);
      res.status(200);
      res.end();
    } else {
      const id = req.query.AudioId;
      const updateCount = await PodcastModel.findByIdAndUpdate(id, {
        $inc: { playCount: 1 },
      }).catch(console.error);
      const contests = await ContestModel.find({ active: true })
        .sort({ startDate: -1 })
        .catch(console.error);
      if (updateCount && contests) {
        const creator = await PodcastCreatorModel.findById({
          _id: updateCount.creatorId,
        }).catch(console.error);
        if (creator) {
          creator.playCount += 1;
          contests.forEach(contest => {
            const updateContest = element =>
              element.contestId.toString() === contest._id.toString();
            const index = creator.creatorScore.findIndex(updateContest);
            const startDate = new Date(contest.startDate);
            const endDate = new Date(contest.endDate);
            const audioDate = new Date(updateCount.createdAt);
            const isValidEntry = audioDate <= endDate && audioDate >= startDate;
            // console.log(updateCount.title, 'isValid', isValidEntry);
            if (isValidEntry) {
              if (index === -1) {
                creator.creatorScore.push({ contestId: contest._id, score: 5 });
              } else if (index !== -1) {
                creator.creatorScore[index].score += 5;
              }
            }
          });
          creator.save().catch(console.error);
          let temp = JSON.stringify({ updateCount, creator });
          res.json(JSON.parse(temp));
          res.end();
        } else {
          res.end();
        }
      } else {
        res.status(500);
        res.json({
          message: 'Failed to fetch count from db',
        });
        res.end();
      }
    }
  } else {
    res.status(405);
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.end();
  }
};

export default connect(updatePlayCount);
