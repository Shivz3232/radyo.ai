import connect from '../../utils/middleware/mongoClient';
import UserProfileModel from '../../models/userProfile';
import upload from '../../utils/middleware/multer';
import cloudinary from '../../utils/cloudinary';
import fs from 'fs';

const postMyProfile =
  (upload.single('profile_img'),
  async (req, res) => {
    if (req.method == 'POST') {
      // const uploader = async path =>
      //   await cloudinary.uploads(path, 'profile_images');
      // const url = '';
      console.log(req.body,req.file);
      // const file = req.file;
      // const { path } = file;
      // const newPath = await uploader(path);
      // url = newPath;
      // fs.unlinkSync(path);

      // res.status(200).json({
      //   message: 'Image Uploaded Successfully',
      //   data: url,
      // });
    } else {
      res.status(405);
      res.setHeader('Access-Control-Allow-Methods', 'POST');
      res.end();
    }
  });

export default postMyProfile;
// console.log(req.body.fullName);
// console.log(req.body.email);
// console.log(req.body.contact);
// console.log(req.body.about);
// console.log(req.body.userId);
// console.log(req.body.img);
