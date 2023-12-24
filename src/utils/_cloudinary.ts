"use server";
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
});

type UploadOptions = {
    resource_type?: "auto" | "image" | "raw" | "video",
    use_filename: boolean,
    unique_filename: boolean,
    overwrite: boolean
}
const imageOptions: UploadOptions = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
};

const pdfOptions: UploadOptions = {
    resource_type: "auto",
    use_filename: true,
    unique_filename: false,
    overwrite: true,
};


/**
 * Retrieves the signature and timestamp for the specified folder.
 *
 * @param {string} folderName - The folder to retrieve the signature for.
 * @return {Object} - An object containing the timestamp and signature.
 */
export async function getSignature(folderName: string) {
    console.log("CONFIG:", cloudinary.config());
    const timestamp = Math.round(new Date().getTime() / 1000);
    const signature = cloudinary.utils.api_sign_request(
        {
            timestamp,
            folder: folderName
        },
        cloudinary.config().api_secret
    )

    return { timestamp, signature }
}

/**
 * Validates the signature of an API request.
 *
 * @param {Object} param - An object containing the public ID, version, and signature.
 * @param {string} param.public_id - The public ID.
 * @param {string} param.version - The version.
 * @param {string} param.signature - The signature.
 * @return {boolean} Returns true if the signature is valid, otherwise false.
 */
export async function validateSignature({ public_id, version, signature }) {
    const expectedSignature = cloudinary.utils.api_sign_request(
        {
            public_id,
            version
        },
        cloudinary.config().api_secret
    )
    if (signature === expectedSignature) {
        return true;
    }
    return false
}
