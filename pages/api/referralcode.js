import connect from '../../utils/middleware/mongoClient';
import PodcastCreatorModel from '../../models/podcastCreator';
import nookies from 'nookies';
import firebase from 'firebase/app';
import 'firebase/auth';
import { verifyIdToken } from '../../utils/firebase/firebaseAdmin';

const updateReferralCode = async (userid, referralcode) => {
  const user = new PodcastCreatorModel({
    referrerCode: referralcode,
  });
  await PodcastCreatorModel.findOneAndUpdate(
    { uid: userid },
    { referrerCode: referralcode },
    function (err, result) {
      console.log(err);
    }
  );
};

const applyReferral = async (req, res) => {
  if (req.method == 'POST') {
    const token = await verifyIdToken(req.body.jwttoken);
    const { uid } = token;
    if (uid == req.body.userid) {
      try {
        connect(updateReferralCode(uid, req.body.referralcode));
      } catch (err) {
        console.log(err);
      }
    }
  }
  res.json({ message: 'OK' });
  res.end();
};

export default applyReferral;
