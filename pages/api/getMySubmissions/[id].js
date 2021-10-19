import connect from '../../../utils/middleware/mongoClient';
import PodcastCreatorModel from '../../../models/podcastCreator';
import PodcastModel from '../../../models/podcast';

const getMySubmissions = async (req, res) => {
  if (req.method === 'GET') {
    const userProfile = await PodcastCreatorModel.find(
      { email: req.query.id },
      (error, result) => {
        if (error) {
          console.log(error);
        }
      }
    );

    const podcast = await PodcastModel.find(
      { creatorId: userProfile[0]._id, status: 'approved' },
      (error, result) => {
        if (error) {
          console.log(error);
        }
      }
    );
    res.status(200).json(podcast);
    res.end();
  } else {
    res.status(405);
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.end();
  }
};

export default connect(getMySubmissions);
