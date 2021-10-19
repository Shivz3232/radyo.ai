import connect from '../../utils/middleware/mongoClient';
import SubscriberEmailModel from '../../models/subscriberEmail';

const subscribe = async (req, res) => {
  if (req.method == 'POST') {
    try {
      const email = await SubscriberEmailModel.create(req.body);
      res.status(201);
      res.json({ success: true, data: email });
      res.end();
    } catch (error) {
      console.log(error);
    }
  } else {
    res.status(405);
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.end();
  }
};

export default connect(subscribe);
