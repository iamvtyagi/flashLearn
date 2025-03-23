const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

/**
 * Uploads an audio file to Cloudinary
 * @param {string} filePath - Path to the audio file
 * @returns {Promise<string>} - Cloudinary URL of the uploaded file
 */
const uploadAudio = async (filePath) => {
    try {
        console.log('Uploading to Cloudinary...');
        const result = await cloudinary.uploader.upload(filePath, {
            resource_type: 'video',
            folder: 'audio',
            use_filename: true
        });
        
        console.log('Upload successful');
        return result.secure_url;
    } catch (error) {
        console.error('Error uploading to Cloudinary:', error);
        throw error;
    }
};

module.exports = { uploadAudio };
