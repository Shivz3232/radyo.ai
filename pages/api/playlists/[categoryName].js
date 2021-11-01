import connect from '../../../utils/middleware/mongoClient';
import PodcastModel from '../../../models/podcast';

const getCategoryAudio = async (req, res) => {
  if (req.method == 'GET') {
    const lastPodcastId = req.query.lastPodcastId;
    const category = req.query.categoryName;
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
    // }
    let filter = { category: category };

    if (lastPodcastId) {
      //   console.log(lastPodcastId);
      const result = await PodcastModel.findById(lastPodcastId).catch(
        console.error
      );
      if (result) {
        // filter['_id'] = { $ne: result._id };
        // if (sort === 'LIKE') {
        //   filter['likeCount'] = { $lte: result.likeCount };
        // } else if (sort === 'LIKE-ASC') {
        //   filter['likeCount'] = { $gte: result.likeCount };
        // } else if (sort === 'PLAY') {
        //   filter['playCount'] = { $lte: result.playCount };
        // } else if (sort === 'PLAY-ASC') {
        //   filter['playCount'] = { $gte: result.playCount };
        // } else if (sort === 'NEWEST') {
        //   filter['createdAt'] = { $lte: result.createdAt };
        // } else if (sort === 'OLDEST') {
        //   filter['createdAt'] = { $gte: result.createdAt };
        // }
        filter['createdAt'] = { $lt: result.createdAt };
      } else return res.status(400).json({ success: false });
    }
    const allAudio = await PodcastModel.find(filter)
      .populate('creatorId', 'creatorName uid', 'users')
      .sort(sortBy)
      // .limit(3)
      .limit(15)
      .catch(console.error);
    if (allAudio) {
      res.json({
        success: true,
        allAudio,
      });
      res.end();
    } else {
      res.status(500);
      res.json({
        message: 'Failed to fetch category podcast from db',
      });
      res.end();
    }
  }
};

export default connect(getCategoryAudio);
