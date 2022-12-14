import cloudinary from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploads = (file, folder, options={}) => {
  return new Promise((resolve, reject) => {
    cloudinary.v2.uploader.upload(
      file,
      { folder: folder, resource_type: 'auto', ...options },
      (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(console.log(error));
        }
      }
    );
  });
};

export const update = (file, publicId) => {
  return new Promise((resolve, reject) => {
    cloudinary.v2.uploader.upload(
      file,
      {
        public_id: publicId,
        resource_type: 'auto',
      },
      (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(console.log(error));
        }
      }
    );
  });
};
