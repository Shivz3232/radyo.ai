import connect from '../../utils/middleware/mongoClient';
import UserProfileModel from '../../models/userProfile';

const postMyProfile = async (req, res) => {
  if (req.method == 'POST') {
    console.log(req.body.fullName);
    console.log(req.body.email);
    console.log(req.body.contact);
    console.log(req.body.about);
    console.log(req.body.userId);
  } else {
    res.status(405);
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.end();
  }
};

export default postMyProfile;