import connect from '../../utils/middleware/mongoClient';
import UserProfileModel from '../../models/userProfile';
import DataURIParser from 'datauri/parser';
import nextConnect from 'next-connect';
import multerUpload from '../../utils/middleware/multer';
import { uploads } from '../../utils/cloudinary';
import path from 'path';

var parser = new DataURIParser();

const formatBufferto64 = file =>
  parser.format(path.extname(file.originalname).toString(), file.buffer);

const uploader = nextConnect({
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

const uploadMiddleware = multerUpload.single('profile_img');
uploader.use(uploadMiddleware);

uploader.post(async (req, res) => {
  if (req.method === 'POST') {
    try {
      const file64 = formatBufferto64(req.file);
      parser = null;
      await uploads(file64.content, 'profile_images').then(uploadResult => {
        let userProfile = new UserProfileModel({
          email: req.body.email,
          userName: req.body.fullName,
          userId: req.body.userId,
          about: req.body.about,
          contact: req.body.contact,
          img: uploadResult,
        });
        const saved = userProfile.save();
      });

      res.status(200).json('Image Uploaded Successfully');
      res.status(200).json({ data: 'success' });
      res.end();
    } catch (error) {
      console.log(error);
    }
  } else {
     res.status(405);
     res.setHeader('Access-Control-Allow-Methods', 'GET');
     res.end();
  }
});

export default connect(uploader);

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};