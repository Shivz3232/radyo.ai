import connect from '../../utils/middleware/mongoClient';
import nextConnect from 'next-connect';
import { uploads } from '../../utils/cloudinary';
import path from 'path';

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
  { name: 'audio', maxCount: 1 },
  { name: 'cover_img', maxCount: 1 },
]);
uploader.use(uploadMiddleware);

uploader.post(async (req, res) => {
  if (req.method === 'POST') {
    let audioFilePath = req.files.audio[0].path;
    let coverImgPath = req.files.cover_img[0].path;

    console.log(audioFilePath);
    console.log(coverImgPath);

    try {
      var audioFile = await uploads(audioFilePath, 'audio_files');
      var coverImg = await uploads(coverImgPath, 'cover_images');
    } catch (error) {
      console.log(error);
    }
    console.log(audioFile, coverImg);
    res.status(200).json({
      message: 'uploaded successfully',
    });
  } else {
    res.status(405);
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.end();
  }
});