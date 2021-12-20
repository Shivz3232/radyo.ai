import connect from '../../../utils/middleware/mongoClient';
import SubscribedUserModel from '../../../models/notificationSubscription';

const saveSubscriptionObject = async (
  req,
  res
) => {
  if (req.method == 'POST') {
    try {
      const subscription = req.body;
      const newUser = new SubscribedUserModel({
        subscriptionObject: subscription,
      });
      await newUser.save();
      res.status(201);
      res.json({
        success: true,
        data: 'entry complete',
      });
      res.end();
    } catch (error) {
      console.log(error);
      res.status(500);
      res.json({
        message: 'Failed to save subscriber data, please try again later.',
      });
      res.end();
    }
  } else {
    res.status(405);
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.end();
  }
};

export default connect(saveSubscriptionObject);
