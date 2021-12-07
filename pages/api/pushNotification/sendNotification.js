import connect from '../../../utils/middleware/mongoClient';
import SubscribedUserModel from '../../../models/notificationSubscription';
import SentNotificationModel from '../../../models/sentNotification';
// import NewsModel from '../../../models/news';
import webpush from 'web-push';
// import { getSession } from 'next-auth/react';
// import UserModel from '../../../models/user';

const sendNotification = async (req, res) => {
  // const session = await getSession({ req });
  // const [{ admin }] = await UserModel.find(
  //   { email: session.user.email },
  //   'admin -_id'
  // );

  if (req.method == 'GET') {
    if (admin) {
      webpush.setVapidDetails(
        'mailto:myuserid@user.com',
        process.env.PUBLIC_VAPID_KEY,
        process.env.PRIVATE_VAPID_KEY
      );

      // Fetching recent news from db
      // const news = await NewsModel.find({})
      //   .sort({ date_published: -1 })
      //   .limit(1)
      //   .catch(err => {
      //     console.log(err);
      //     return;
      //   });

      // Saving sent News to db
      const newSentNotification = new SentNotificationModel({
        // sentBy: session.user.email,
        // news_id: news[0]._id,
        sent_date: new Date(),
        click_count: 0,
      });
      const sentNotificationObjectId = await newSentNotification.save();

      const options = {
        // body: news[0].title,
        // image_url: news[0].image_url,
        // _id: news[0]._id,
        notif_id: sentNotificationObjectId._id,
        // icon: '../../logo/logo.jpg',
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
