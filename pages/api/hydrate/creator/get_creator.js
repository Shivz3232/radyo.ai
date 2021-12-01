import connect from '../../../../utils/middleware/mongoClient';
import PodcastCreatorModel from '../../../../models/podcastCreator';
import PodcastModel from './../../../../models/podcast';

const getCreators = async (req, res) => {
  if (req.method == 'GET') {
    const creatorId = req.query.creatorId;
    let filter = {};
    let limit = 15;
    let allCreator = undefined;
    if (creatorId) {
      filter = { ...filter, _id: creatorId };
      allCreator = await PodcastCreatorModel.findOne(filter, '-email')
        .sort({ audiosPublished: -1 })
        .limit(limit)
        .catch(console.error);
    } else {
      allCreator = await PodcastCreatorModel.find(filter, '-email')
        .sort({ audiosPublished: -1 })
        .limit(limit)
        .catch(console.error);
    }

    if (allCreator) {
      if (creatorId) {
        const audio = await PodcastModel.find({
          creatorId: creatorId,
          status: 'approved',
        });
        if (audio) {
          if (allCreator.audiosPublished !== audio.length) {
            allCreator.audiosPublished = audio.length;
            allCreator.save().catch(console.error);
          }
        }
      }
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
