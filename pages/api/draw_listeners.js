import { getLoginSession } from '../../utils/auth';
import connect from '../../utils/middleware/mongoClient';
import ContestModel from '../../models/contest';
import PodcastCreatorModel from './../../models/podcastCreator';

const getListener = async (req, res) => {
  const session = await getLoginSession(req);

  if (!session) {
    res.status(401);
    return res.end();
  }

  function getRandom(arr, n) {
    while (n > arr.length) n = n / 2;
    var result = new Array(n),
      len = arr.length,
      taken = new Array(len);
    if (n > len)
      throw new RangeError('getRandom: more elements taken than available');
    while (n--) {
      var x = Math.floor(Math.random() * len);
      result[n] = arr[x in taken ? taken[x] : x];
      taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
  }

  if (req.method == 'GET') {
    const result = await PodcastCreatorModel.find({}).catch(console.error);
    if (result) {
      const contest = await ContestModel.findOne({
        url_name: 'listener-award',
      }).catch(console.error);
      const winner = getRandom(result, 10);
      if (contest) {
        if (req.query.get) {
          res.status(200);
          res.json({ contest });
          res.end();
        } else {
          const contest_result = winner.map((e, i) => {
            return { creatorEmail: e.email, creatorName: e.creatorName };
          });
          contest.contest_results.push({
            result: contest_result,
            date: new Date(),
          });
          contest.save().catch(console.error);
          res.status(200);
          res.json({ contest });
          res.end();
        }
      } else res.end();
    } else {
      res.status(500);
      res.json({
        message: 'Failed to fetch winner from DB',
      });
      res.end();
    }
  } else {
    res.status(405);
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.end();
  }
};

export default connect(getListener);
