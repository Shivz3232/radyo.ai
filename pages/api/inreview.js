import { getLoginSession } from '../../utils/auth';
import PodcastModel from '../../models/podcast';
import connect from '../../utils/middleware/mongoClient';
import PodcastCreatorModel from '../../models/podcastCreator';

const getPodcastsInReview = async (req, res) => {
  const session = await getLoginSession(req);

  if (!session) {
    res.status(401);
    return res.end();
  }

  if (req.method == 'GET') {
    const type = req.query.status;
    let filter = {
      status: type,
    };
    // console.log(type);
    if (type === 'reported') {
      filter = {
        status: 'approved',
        reported: { $gte: 1 },
      };
    }
    const podCasts = await PodcastModel.find(
      filter,
      '-playCount -shareCount -likeCount'
    )
      .populate('creatorId', 'creatorName', 'users')
      .catch(console.error);

    if (podCasts) {
      res.json({
        podCasts,
      });
      res.end();
    } else {
      res.status(500);
      res.json({
        message: 'Failed to fetch podcasts from DB',
      });
      res.end();
    }
  } else if (req.method == 'POST') {
    const id = req.body.id;

    if (typeof id == 'string' && id.length == 24) {
      const action = req.body.action;
      let updates, audiosPublished;

      if (action === 'approve') {
        updates = { status: 'approved' };
        audiosPublished = {
          $inc: { audiosPublished: 1 },
          $push: { audiosPublishedOn: new Date() },
        };
      } else if (action === 'reject') {
        updates = { status: 'rejected' };
        audiosPublished = {
          $inc: { audiosPublished: -1 },
        };
      } else {
        res.status(400);
        res.json({
          message: 'Invalid action specified',
        });
        return res.end();
      }

      const success = await PodcastModel.findByIdAndUpdate(id, updates).catch(
        err => {
          console.error(err);
        }
      );

      if (success) {
        // console.log(success);
        const updateAudioPublished = await PodcastCreatorModel.findOneAndUpdate(
          { _id: success.creatorId },
          audiosPublished
        ).catch(console.error);
        if (updateAudioPublished) {
          console.log(updateAudioPublished);
          res.end();
        } else {
          res.status(500);
          res.json({
            message: 'Failed to update document',
          });
          res.end();
        }
      } else {
        res.status(500);
        res.json({
          message: 'Failed to update document',
        });
        res.end();
      }
    } else {
      res.status(400);
      res.json({
        message: 'Invalid id specified',
      });
      return res.end();
    }
  } else {
    res.status(405);
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.end();
  }
};

export default connect(getPodcastsInReview);
