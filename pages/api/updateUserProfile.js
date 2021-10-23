import connect from '../../utils/middleware/mongoClient';
import PodcastCreatorModel from '../../models/podcastCreator';
import DataURIParser from 'datauri/parser';
import nextConnect from 'next-connect';
import multerUpload from '../../utils/middleware/multer';
import { uploads, update } from '../../utils/cloudinary';
import path from 'path';

var parser = new DataURIParser();

const formatBufferto64 = file =>
  parser.format(path.extname(file.originalname).toString(), file.buffer);

const uploader = nextConnect();

const uploadMiddleware = multerUpload.single('avatarImage');
uploader.use(uploadMiddleware);

uploader.post(async (req, res) => {
  if (req.method === 'POST') {
    try {
      if (req.file) {
        const file64 = formatBufferto64(req.file);
        const userData = await PodcastCreatorModel.find(
          { email: req.body.email },
          'cloudinaryId -_id'
        );

        if (userData[0].cloudinaryId) {
          var uploadResult = await update(
            file64.content,
            userData[0].cloudinaryId
          );
        } else {
          var uploadResult = await uploads(file64.content, 'profile_images');
        }

        let UpdateProfile = await PodcastCreatorModel.updateOne(
          { email: req.body.email },
          {
            creatorName: req.body.creatorName,
            about: req.body.about,
            contact: req.body.contact,
            avatarImage: uploadResult.secure_url,
            cloudinaryId: uploadResult.public_id,
          },
          (err, result) => {
            if (err) {
              console.log(err);
            } else {
              res.status(200).json('Profile Updated Successfully');
              res.end();
            }
          }
        );
      } else {
        let UpdateProfile = await PodcastCreatorModel.updateOne(
          { email: req.body.email },
          {
            creatorName: req.body.creatorName,
            about: req.body.about,
            contact: req.body.contact,
          },
          (err, result) => {
            if (err) {
              console.log(err);
            } else {
              res.status(200).json('Profile Updated Successfully');
              res.end();
            }
          }
        );
      }
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

// {
//   onNoMatch(req, res) {
//     res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
//   },
// }