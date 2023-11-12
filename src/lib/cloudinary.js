// const cloudinary = require('cloudinary').v2;

import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: 'dhms6rode',
    api_key: '268797749231342',
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
});

// export default cloudinary
console.log(cloudinary.config())

const uploadImage = async (imagePath) => {

    const options = {
        use_filename: false,
        unique_filename: true,
        overwrite: true,
    };

    try {
        // Upload the image
        const result = await cloudinary.uploader.upload(imagePath, options);
        console.log(result.secure_url);
        return result.public_id;
    } catch (error) {
        console.error(error);
    }
};

