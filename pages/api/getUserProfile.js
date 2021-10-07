import connect from '../../utils/middleware/mongoClient';
import PodcastCreatorModel from '../../models/podcastCreator';

const getUserProfile = async (req, res) => {
  if (req.method == 'POST') {
    const userProfile = await PodcastCreatorModel.find(
      { email: req.body.user },
      (error, result) => {
         if (!error) {
            console.log(result);
         } else {
            console.log(error);
         }
      }
    );
    res.json(userProfile);
    res.end();
  } else {
    res.status(405);
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.end();
  }
};

export default connect(getUserProfile);
