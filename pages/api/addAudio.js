import connect from '../../utils/middleware/mongoClient';
import nextConnect from 'next-connect';
import multer from 'multer';
import { uploads } from '../../utils/cloudinary';
import path from 'path';
import PodcastCreatorModel from '../../models/podcastCreator';
import PodcastModel from '../../models/podcast';

const uploader = nextConnect({
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + '-' + Date.now() + path.extname(file.originalname)
    );
  },
});

var upload = multer({ storage: storage });

const uploadMiddleware = upload.fields([
  { name: 'audioSrc', maxCount: 1 },
  { name: 'coverImg', maxCount: 1 },
]);
uploader.use(uploadMiddleware);

uploader.post(async (req, res) => {
  if (req.method === 'POST') {
    let audioFilePath = req.files.audioSrc[0].path;
    let coverImgPath = req.files.coverImg[0].path;
    
    var audioFile = await uploads(audioFilePath, 'audio_files');
    var coverImg = await uploads(coverImgPath, 'cover_images');
    console.log(audioFile, coverImg);
    let createrData = await PodcastCreatorModel.find(
      { email: req.body.email },
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          console.log(result);
        }
      }
    );

    let newPodcast = new PodcastModel({
      creatorId: createrData[0]._id,
      coverImage: coverImg.url,
      category: req.body.cat,
      title: req.body.title,
      description: req.body.description,
      playCount: 0,
      likeCount: 0,
      shareCount: 0,
      language: req.body.lan,
      // tags: req.body.hashtags,
      audioSrc: audioFile.url,
      // fileSize: '',
      // duration: 0,
    });
    console.log(newPodcast);
    await newPodcast.save().catch(err => {
      console.log(err);
    });

    res.status(200).json({
      message: 'uploaded successfully',
    });
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
