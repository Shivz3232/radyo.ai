import connect from '../../utils/middleware/mongoClient';
import PodcastModel from '../../models/podcast';

const getSearchResult = async (req, res) => {
  if (req.method == 'GET') {
    const searchQuery = req.query.query;
    const re = new RegExp(searchQuery.toString(), 'gi');
    const lastPodcastId = req.query.lastPodcastId;
    // console.log(searchQuery, re, lastPodcastId);
    let filter = {
      $or: [
        { title: { $regex: re } },
        { description: { $regex: re } },
        { creatorName: { $regex: re } },
      ],
      status: 'approved',
    };
    if (lastPodcastId) {
      // console.log(lastPodcastId);
      const result = await PodcastModel.findById(lastPodcastId).catch(
        console.error
      );
      if (result) filter['createdAt'] = { $lt: result.createdAt };
      else return res.status(400).json({ success: false });
    }

    const allAudio = await PodcastModel.find(filter)
      .populate('creatorId', 'creatorName', 'users')
      //////////////change limit to 20
      .limit(20)
      .sort({ createdAt: -1 })
      // .sort({ score: -1 })
      .catch(console.error);
    if (allAudio) {
      //////////////////////////////////////////////
      // console.log(allAudio);
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

export default connect(getSearchResult);
