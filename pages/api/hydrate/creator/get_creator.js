import connect from '../../../../utils/middleware/mongoClient';
import PodcastCreatorModel from '../../../../models/podcastCreator';

const getCreators = async (req, res) => {
  if (req.method == 'GET') {
    const creatorId = req.query.creatorId;
    let filter = {};
    let limit = 15;
    if (creatorId) {
      filter = { ...filter, _id: creatorId };
    }

    const allCreator = await PodcastCreatorModel.find(filter)
      .sort({ audiosPublished: -1 })
      .limit(limit)
      .catch(console.error);
    if (allCreator) {
      res.json({
        allCreator,
      });
      res.end();
    } else {
      res.status(500);
      res.json({
        message: 'Failed to fetch creators from db',
      });
      res.end();
    }
  } else {
    res.status(405);
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.end();
  }
};

export default connect(getCreators);
