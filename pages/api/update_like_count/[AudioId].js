import connect from '../../../utils/middleware/mongoClient';
import PodcastModel from '../../../models/podcast';

const updateLikeCount = async (req, res) => {
  if (req.method == 'POST') {
    const id = req.query.AudioId;
    const action = req.body.action;
    const userId = req.body.userid;
    let updateCount = undefined;
    if (action === 'like') {
      const uid = { userId: userId };
      console.log(uid);
      updateCount = await PodcastModel.findOneAndUpdate(
        { _id: id },
        {
          $push: { likedBy: uid },
          $inc: { likeCount: 1 },
        }
      ).catch(console.error);
    } else if (action === 'unlike') {
      updateCount = await PodcastModel.findOneAndUpdate(
        { _id: id },
        {
          $inc: { likeCount: -1 },
        }
      ).catch(console.error);
    }
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

export default connect(updateLikeCount);
