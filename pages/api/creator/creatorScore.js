//import { NextApiRequest, NextApiResponse } from 'next';
import connect from '../../../utils/middleware/mongoClient';
import PodcastCreatorModel from '../../../models/podcastCreator';

const getCreatorAudio = async (req, res) => {
  if (req.method == 'GET') {
    //const creatorId = req.query.creatorId;
    const contestId = req.query.contestId;
    // console.log('id', contestId);
    const allCreators = await PodcastCreatorModel.find({})
      .sort({ creatorScore: -1 })
      .catch(console.error);
    if (allCreators) {
      res.json({
        allCreators,
      });
      res.end();
    } else {
      res.status(500);
      res.json({
        message: 'Failed to fetch creator score from db',
      });
      res.end();
    }
  } else {
    res.status(405);
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.end();
  }
};

export default connect(getCreatorAudio);
