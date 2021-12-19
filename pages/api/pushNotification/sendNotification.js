import connect from '../../../utils/middleware/mongoClient';
import SubscribedUserModel from '../../../models/notificationSubscription';
import SentNotificationModel from '../../../models/sentNotification';
import Podcast from "../../../models/podcast";
import webpush from 'web-push';

const sendNotification = async (req, res) => {
  // Ask Nishanth sir about securing apis
  const admin = true;

  if (req.method == 'GET') {
    if (admin) {
      webpush.setVapidDetails(
        'mailto:myuserid@user.com',
        process.env.PUBLIC_VAPID_KEY,
        process.env.PRIVATE_VAPID_KEY
      );

      // Fetching recent approved podcast from db
      const podcast = await Podcast.findOne({ status: "approved" }).sort({ updatedAt: -1 }).catch(console.error);

      if (!podcast) {
        res.status(500);
        res.json({
          message: "Failed to fetch latest approved podcast from DB"
        });
        return res.end();
      }

      // Saving sent podcast to db
      const newSentNotification = new SentNotificationModel({
        // sentBy: session.user.email,
        podcastId: podcast._id,
        sentDate: new Date(),
        clickCount: 0,
      });
      const sentNotificationObjectId = await newSentNotification.save();

      const options = {
        body: podcast.title,
        image_url: podcast.coverImage,
        _id: podcast._id,
        notif_id: sentNotificationObjectId._id,
        icon: '../../../assets/radyologo.svg',
        title: 'Radyo',
      };

      SubscribedUserModel.find({}, (err, foundItems) => {
        if (err) {
          console.log(err);
        } else {
          foundItems.map(item => {
            try {
              webpush.sendNotification(
                item.subscriptionObject,
                JSON.stringify(options)
              );
            } catch (error) {
              console.log('Not valid object');
            }
          });
        }
      });

      res.status(200);
      res.end();
    } else {
      console.log('Only Admin can send Notification');
      res.status(405);
      res.end();
    }
  } else {
    res.status(405);
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.end();
  }
};

export default connect(sendNotification);
