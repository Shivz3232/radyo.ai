import connect from '../../utils/middleware/mongoClient';
import nextConnect from 'next-connect';
import multer from 'multer';
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
  { name: 'audiofile', maxCount: 1 },
  { name: 'coverImg', maxCount: 1 },
]);
uploader.use(uploadMiddleware);

uploader.post((req, res) => {
  if (req.method === 'POST') {
    console.log(req.files);
    console.log(req.body);
  } else {
    res.status(405);
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.end();
  }
});

export default uploader;

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};
