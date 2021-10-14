import cloudinary from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploads = (file, folder) => {
  return new Promise((resolve, reject) => {
    cloudinary.v2.uploader.upload(
      file,
      { folder: folder, resource_type: 'auto' },
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
// resolve({
//   url: result.secure_url,
// });
