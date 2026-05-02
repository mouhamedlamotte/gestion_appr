const cloudinary = require('../config/cloudinary');
const { Readable } = require('stream');

const uploadImage = (fileBuffer, folder = 'uploads') => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder, resource_type: 'image' },
      (error, result) => {
        if (error) return reject(error);
        resolve({ url: result.secure_url, public_id: result.public_id });
      }
    );
    Readable.from(fileBuffer).pipe(uploadStream);
  });
};

const deleteImage = async (publicId) => {
  const result = await cloudinary.uploader.destroy(publicId);
  if (result.result !== 'ok') throw { status: 400, message: 'Suppression image échouée' };
  return result;
};

const getImageUrl = (publicId, options = {}) => {
  return cloudinary.url(publicId, { secure: true, ...options });
};

module.exports = { uploadImage, deleteImage, getImageUrl };
