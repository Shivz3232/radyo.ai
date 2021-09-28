import connect from '../../../utils/middleware/mongoClient';
import PodcastModel from '../../../models/podcast';

const getCategoryAudio = async (req, res) => {
  if (req.method == 'GET') {
    const lastPodcastId = req.query.lastPodcastId;
    const category = req.query.categoryName;

    let filter = { category: category };

    if (lastPodcastId) {
      //   console.log(lastPodcastId);
      const result = await PodcastModel.findById(lastPodcastId).catch(
        console.error
      );
      if (result) filter['createdAt'] = { $lt: result.createdAt };
      else return res.status(400).json({ success: false });
    }
    const allAudio = await PodcastModel.find(filter)
      .populate('creatorId', 'creatorName', 'users')
      .sort({ createdAt: -1 })
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
