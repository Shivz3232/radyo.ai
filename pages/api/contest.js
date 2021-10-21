import { getLoginSession } from '../../utils/auth';
import connect from '../../utils/middleware/mongoClient';
import ContestModel from '../../models/contest';
import PodcastCreatorModel from './../../models/podcastCreator';

const getContest = async (req, res) => {
  const session = await getLoginSession(req);

  if (!session) {
    res.status(401);
    return res.end();
  }

  if (req.method == 'GET') {
    const type = req.query.status;
    let filter = {
      active: type === 'active' ? true : false,
    };
    const result = await ContestModel.find(filter).catch(console.error);
    if (result) {
      res.json({
        result,
      });
      res.end();
    } else {
      res.status(500);
      res.json({
        message: 'Failed to fetch contests from DB',
      });
      res.end();
    }
  } else if (req.method == 'POST') {
    const id = req.body.id;

    if (typeof id == 'string' && id.length == 24) {
      const action = req.body.action;

      const contest = await ContestModel.findOne({ _id: id }).catch(
        console.error
      );
      const allCreators = await PodcastCreatorModel.find({})
        .sort({ creatorScore: -1 })
        .catch(console.error);

      if (contest && allCreators) {
        if (action === 'END') {
          contest.active = false;
        } else {
          res.status(400);
          res.json({
            message: 'Invalid action specified',
          });
          return res.end();
        }
        const sortedData = allCreators
          .sort((a, b) => {
            const updateContest = element =>
              element.contestId.toString() === id.toString();
            const indexofA = a.creatorScore.findIndex(updateContest);
            const indexofB = b.creatorScore.findIndex(updateContest);
            if (indexofA !== -1 && indexofB !== -1) {
              return a.creatorScore[indexofA].score <
                b.creatorScore[indexofB].score
                ? 1
                : -1;
            } else return 0;
          })
          .splice(0, 10);
        const contest_results = [];
        sortedData.forEach((item, index) => {
          const updateContest = element =>
            element.contestId.toString() === id.toString();
          const indexof = item.creatorScore.findIndex(updateContest);
          let value;
          //   console.log(indexof);
          if (indexof !== -1) {
            value = item.creatorScore[indexof].score;
          } else value = 0;
          contest_results.push({
            creatorId: item._id,
            contest_rank: index + 1,
            creatorName: item.creatorName,
            creatorScore: value,
          });
        });
        contest.contest_results = contest_results;
        contest.save().catch(console.error);
        res.status(200);
        res.json({
          contest,
        });
        res.end();
      } else {
        res.status(500);
        res.json({
          message: 'Failed to update document',
        });
        res.end();
      }
    } else {
      res.status(400);
      res.json({
        message: 'Invalid id specified',
      });
      return res.end();
    }
  } else {
    res.status(405);
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.end();
  }
};

export default connect(getContest);
