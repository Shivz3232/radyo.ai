import mongoose from 'mongoose';

const connect = handler => async (req, res) => {
  if (mongoose.connections[0].readyState) {
    // if connection already exists
    return handler(req, res);
  }

  const connString = process.env.MONGO_URI;

  if (connString) {
    await mongoose.connect(connString, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false,
    });
    return handler(req, res);
  } else {
    return res
      .status(500)
      .json({ success: false, msg: 'MongoDB connection string not found' });
  }
};

export default connect;
