import connect from '../../utils/middleware/mongoClient';
import PodcastModel from '../../models/podcast';

const getNewReleases = async (req, res) => {
  if (req.method == 'GET') {
    const allAudio = await PodcastModel.find({ status: 'approved' })
      .populate('creatorId', 'creatorName uid', 'users')
      .sort({ createdAt: -1 })
      .catch(console.error);
    if (allAudio) {
      // console.log('audio file:', allAudio[0]);
      // console.log('creatorId:', allAudio[0].creatorId);
      res.json({
        allAudio,
      });
      res.end();
    } else {
      res.status(500);
      res.json({
        message: 'Failed to fetch podcast from db',
      });
      res.end();
    }
  } else {
    res.status(405);
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.end();
  }
};

export default connect(getNewReleases);
