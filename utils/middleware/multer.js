import multer from 'multer';

// const storage = multer.diskStorage({
//   destination: (req, res, cb) => {
//     cb(null, './uploads/profile_images');
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + '_' + file.originalname);
//   },
// });

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg'
  ) {
    cb(null, true);
  } else {
    cb({ message: 'Unsupported File Format' }, false);
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 7 },
  fileFilter: fileFilter,
});

module.exports = upload;
