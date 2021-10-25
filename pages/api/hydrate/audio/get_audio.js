import connect from '../../../../utils/middleware/mongoClient';
import PodcastModel from '../../../../models/podcast';

const getAudios = async (req, res) => {
  if (req.method == 'GET') {
    const audioId = req.query.audioId;
    const category = req.query.category;
    let filter = { status: 'approved' };
    let limit = 150;
    if (audioId) {
      filter = { ...filter, _id: audioId };
    }
    if (category) {
      filter = { ...filter, category: category };
      limit = 15;
    }

    const allAudio = await PodcastModel.find(filter)
      .populate('creatorId', 'creatorName', 'users')
      .limit(limit)
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
        message: 'Failed to fetch podcasts from db',
      });
      res.end();
    }
  } else {
    res.status(405);
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.end();
  }
};

export default connect(getAudios);
