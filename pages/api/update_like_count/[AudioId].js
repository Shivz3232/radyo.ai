import connect from '../../../utils/middleware/mongoClient';
import PodcastModel from '../../../models/podcast';
import PodcastCreatorModel from '../../../models/podcastCreator';
import ContestModel from '../../../models/contest';

const updateLikeCount = async (req, res) => {
  if (req.method == 'POST') {
    const id = req.query.AudioId;
    const action = req.body.action;
    const userId = req.body.userid;
    let updateCount = undefined;
    let creator = undefined;
    const uid = { userId: userId };
    const contests = await ContestModel.find({ active: true })
      .sort({ startDate: -1 })
      .catch(console.error);
    if (action === 'like') {
      updateCount = await PodcastModel.findOneAndUpdate(
        { _id: id },
        {
          $push: { likedBy: uid },
          $inc: { likeCount: 1 },
        }
      ).catch(console.error);
    } else if (action === 'unlike') {
      updateCount = await PodcastModel.findOneAndUpdate(
        { _id: id },
        {
          $pull: { likedBy: uid },
          $inc: { likeCount: -1 },
        }
      ).catch(console.error);
    }

    if (updateCount) {
      creator = await PodcastCreatorModel.findById({
        _id: updateCount.creatorId,
      }).catch(console.error);
    }

    if (updateCount && contests && creator) {
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
            creator.creatorScore.push({ contestId: contest._id, score: 3 });
          } else if (index !== -1) {
            if (action === 'like') creator.creatorScore[index].score += 3;
            else if (action === 'unlike')
              creator.creatorScore[index].score -= 3;
          }
        }
      });
      creator.save().catch(console.error);
      let temp = JSON.stringify({ updateCount, creator });
      res.json(JSON.parse(temp));
      res.end();
    } else {
      res.status(500);
      res.json({
        message: 'Failed to fetch count from db',
      });
      res.end();
    }
  } else {
    res.status(405);
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.end();
  }
};

export default connect(updateLikeCount);
