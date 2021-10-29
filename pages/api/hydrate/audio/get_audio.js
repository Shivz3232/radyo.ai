import connect from '../../../../utils/middleware/mongoClient';
import PodcastModel from '../../../../models/podcast';

const getAudios = async (req, res) => {
  if (req.method == 'GET') {
    const audioId = req.query.audioId;
    const category = req.query.category;
    let sortBy = { createdAt: -1 };
    // const sort = req.query.sortBy;
    // if (sort === 'LIKE') {
    //   sortBy = { likeCount: -1 };
    // } else if (sort === 'LIKE-ASC') {
    //   sortBy = { likeCount: 1 };
    // } else if (sort === 'PLAY') {
    //   sortBy = { playCount: -1 };
    // } else if (sort === 'PLAY-ASC') {
    //   sortBy = { playCount: 1 };
    // } else if (sort === 'NEWEST') {
    //   sortBy = { createdAt: -1 };
    // } else if (sort === 'OLDEST') {
    //   sortBy = { createdAt: 1 };
    // }
    let filter = { status: 'approved' };
    let limit = 150;
    if (audioId) {
      filter = { ...filter, _id: audioId };
    }
    if (category) {
      filter = { ...filter, category: category };
      // limit = 3;
      limit = 15;
    }

    const allAudio = await PodcastModel.find(filter)
      .populate('creatorId', 'creatorName uid', 'users')
      .limit(limit)
      .sort(sortBy)
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
