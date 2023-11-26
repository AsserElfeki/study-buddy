"use server";
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: 'dhms6rode',
    api_key: '268797749231342',
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
});
// export default cloudinary
// console.log(cloudinary.config())
const uploadImage = async (imagePath) => {

    const options = {
        use_filename: true,
        unique_filename: false,
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
const getAssetInfo = async (publicId) => {

    // Return colors in the response
    const options = {
        colors: true,
    };

    try {
        // Get details about the asset
        const result = await cloudinary.api.resource(publicId, options);
        console.log(result);
        return result.colors;
    } catch (error) {
        console.error(error);
    }
};

export async function getSignature() {
    const timestamp = Math.round(new Date().getTime() / 1000);
    const signature = cloudinary.utils.api_sign_request(
        {
            timestamp,
            folder: "test"
        },
        cloudinary.config().api_secret
    )
    // console.log("🚀 ~ file: _cloudinary.ts:54 ~ getSignature ~ cloudinary.config().api_secret:", cloudinary.config().api_secret)
    console.log("time Stamp:", timestamp);
    console.log("signature:", signature);
    return { timestamp, signature }
}

export async function saveToDataBase({ public_id, version, signature }) {
    const expectedSignature = cloudinary.utils.api_sign_request(
        {
            public_id,
            version
        },
        cloudinary.config().api_secret
    )
    console.log("🚀 ~ file: _cloudinary.ts:68 ~ saveToDataBase ~ expectedSignature:", expectedSignature)
    console.log("🚀 ~ file: _cloudinary.ts:68 ~ saveToDataBase ~ signature:", signature)
    if (signature === expectedSignature) {
        console.log({ public_id });
    }
}