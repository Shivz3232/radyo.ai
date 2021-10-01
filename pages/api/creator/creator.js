//import { NextApiRequest, NextApiResponse } from 'next';
import connect from '../../../utils/middleware/mongoClient';
import PodcastCreatorModel from '../../../models/podcastCreator';

const getCreatorAudio = async (req, res) => {
  if (req.method == 'GET') {
    //const creatorId = req.query.creatorId;
    const allAudio = await PodcastCreatorModel.find({})
      .sort({ createdAt: -1 })
      .catch(console.error);
    if (allAudio) {
      res.json({
        allAudio,
      });
      res.end();
    } else {
      res.status(500);
      res.json({
        message: 'Failed to fetch love bytes from db',
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
