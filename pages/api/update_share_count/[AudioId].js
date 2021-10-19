import connect from '../../../utils/middleware/mongoClient';
import PodcastModel from '../../../models/podcast';

const updateShareCount = async (req, res) => {
  if (req.method == 'POST') {
    const id = req.query.AudioId;
    const updateCount = await PodcastModel.findByIdAndUpdate(id, {
      $inc: { shareCount: 1 },
    }).catch(console.error);
    if (updateCount) {
      let temp = JSON.stringify({ updateCount });
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

export default connect(updateShareCount);
