import connect from '../../utils/middleware/mongoClient';
import SubscriberEmailModel from '../../models/subscriberEmail';

const subscribe = async (req, res) => {
  if (req.method === 'POST') {
    try {
      const email = await SubscriberEmailModel.create(req.body);
      console.log('email');
      res.status(201).json({ success: true, data: email });
      res.end();
    } catch (error) {
      console.log('error some');
      res.status(400).json({ success: false });
      res.end();
    }
  }
};

export default connect(subscribe);
