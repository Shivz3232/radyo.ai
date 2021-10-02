import connect from '../../utils/middleware/mongoClient';
import UserProfileModel from '../../models/userProfile';
import nextConnect from 'next-connect';
import upload from '../../utils/middleware/multer';
import uploads from '../../utils/cloudinary';
import fs from 'fs';

const postMyProfile = nextConnect({
  // Handle any other HTTP method
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

const uploadMiddleware = upload.single('profile_img');
postMyProfile.use(uploadMiddleware);


postMyProfile.post(async (req, res) => {
  if (req.method == 'POST') {
    // console.log(req, req.file);
    const uploader = async path =>
      await uploads(path, 'profile_images');
    const url = '';
    const file = req.file;
    const { path } = file;
    const newPath = await uploader(path);
    url = newPath;
    fs.unlinkSync(path);

    res.status(200).json({
      message: 'Image Uploaded Successfully',
      data: url,
    });
  } else {
    res.status(405);
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.end();
  }
});

export default postMyProfile;
// (upload.single('profile_img')

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};