import connect from '../../utils/middleware/mongoClient';
import nextConnect from 'next-connect';
import multer from 'multer';
import { uploads } from '../../utils/cloudinary';
import path from 'path';
import PodcastCreatorModel from '../../models/podcastCreator';
import PodcastModel from '../../models/podcast';

const createTagsArray = tagsString => {
  let tags = tagsString.split(' ').join('');
  return tags.split(',');
};

const uploader = nextConnect();

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

const allowed_formats = [
  'audio/mpeg',
  'audio/wav',
  'audio/webm',
  'audio/ogg',
  'application/octet-stream',
  'image/jpg',
  'image/png',
  'image/jpeg',
];

const fileFilter = (req, file, cb) => {
  if (allowed_formats.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb({ message: 'Unsupported File Format' }, false);
  }
};

var upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 10 },
  fileFilter: fileFilter,
});

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

    let creatorData = await PodcastCreatorModel.find(
      { email: req.body.email },
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          console.log('user found');
        }
      }
    );

    let newPodcast = new PodcastModel({
      creatorId: creatorData[0]._id,
      creatorName: creatorData[0].creatorName,
      coverImage: coverImg.secure_url,
      category: req.body.cat,
      title: req.body.title,
      description: req.body.description,
      playCount: 0,
      likeCount: 0,
      likedBy: [],
      shareCount: 0,
      language: req.body.lan,
      tags: createTagsArray(req.body.hashTags),
      audioSrc: audioFile.secure_url.replace('.webm','.mp3'),
      fileSize: `${(audioFile.bytes / 1000000).toFixed(2)} MB`,
      // fileSize: `${Math.round(audioFile.bytes / 1000000) * 100}MB`,
      duration: Math.floor(audioFile.duration),
    });
    
    await newPodcast.save().catch(err => {
      console.log(err);
    });

    res.status(200).json({
      message: 'uploaded successfully',
    });
    res.end();
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