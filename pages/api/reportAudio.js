import connect from '../../utils/middleware/mongoClient';
import PodcastModel from '../../models/podcast';

const reportAudio = async (req, res) => {
  if (req.method == 'POST') {
    const id = req.body.audioId;
    const report = req.body.report;

    const updateCount = await PodcastModel.findOneAndUpdate(
      { _id: id },
      {
        $addToSet: { reportedBy: report },
        $inc: { reported: 1 },
      }
    ).catch(console.error);

    if (updateCount) {
      let temp = JSON.stringify(updateCount);
      res.json(JSON.parse(temp));
      res.end();
    } else {
      res.status(500);
      res.json({
        message: 'Failed to update the db',
      });
      res.end();
    }
  } else {
    res.status(405);
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.end();
  }
};

export default connect(reportAudio);
