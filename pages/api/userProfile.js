import connect from '../../utils/middleware/mongoClient';
import UserProfileModel from '../../models/userProfile';
import DataURIParser from 'datauri/parser';
import nextConnect from 'next-connect';
import multerUpload from '../../utils/middleware/multer';
import {uploads} from '../../utils/cloudinary';
import path from 'path';

const parser = new DataURIParser();

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
  console.log(req.file);
  console.log(req.body);
  const file64 = formatBufferto64(req.file);
  const uploadResult = await uploads(file64.content, 'profile_images');
  console.log(uploadResult);

  res.status(200).json({
    message: 'Image Uploaded Successfully',
  });
  res.status(200).json({ data: 'success' });
});

export default uploader;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};