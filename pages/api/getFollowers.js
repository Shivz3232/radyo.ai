import connect from '../../utils/middleware/mongoClient';
import PodcastCreatorModel from '../../models/podcastCreator';

const getFollowers = async (req, res) => {
  if (req.method == 'POST') {
    try {
      const result = await PodcastCreatorModel.findOne({
        uid: req.body.creatorId,
      });
      res.status(200).json({ followers: result.followers });
      res.end();
    } catch (err) {
      res.status(405);
      res.end();
    }
  } else {
    res.status(400);
    res.end();
  }
};

export default connect(getFollowers);
