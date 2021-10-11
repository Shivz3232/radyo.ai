import connect from '../../utils/middleware/mongoClient';
import PodcastCreatorModel from '../../models/podcastCreator';
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

const uploadMiddleware = multerUpload.single('avatarImage');
uploader.use(uploadMiddleware);

uploader.post(async (req, res) => {
  console.log(req.body);
  console.log(req.file);
  if (req.method === 'POST') {
    try {
      if (req.file) {
        const file64 = formatBufferto64(req.file);
        parser = null;
        await uploads(file64.content, 'profile_images').then(async(uploadResult) => {
          console.log(uploadResult);
          let UpdateProfile = await PodcastCreatorModel.updateOne(
            { email: req.body.email },
            {
              creatorName: req.body.creatorName,
              about: req.body.about,
              contact: req.body.contact,
              avatarImage: uploadResult.url,
            },
            (err, result) => {
              if (err) {
                console.log(err);
              } else {
                console.log(result);
              }
            }
          );
        });
      }
      else{
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
              console.log(result);
            }
          }
        );
      }
    
      res.status(200).json('Profile Updated Successfully');
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