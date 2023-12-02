"use server";
import prisma from '@src/lib/prisma';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: 'dhms6rode',
    api_key: '268797749231342',
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
});

type UploadOptions = {
    resource_type?: "auto" | "image" | "raw" | "video" ,
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




export async function getSignature(folder: string) {
    const timestamp = Math.round(new Date().getTime() / 1000);
    const signature = cloudinary.utils.api_sign_request(
        {
            timestamp,
            folder: folder
        },
        cloudinary.config().api_secret
    )
    console.log("time Stamp:", timestamp);
    console.log("signature:", signature);
    return { timestamp, signature }
}

export async function validateSignature({ public_id, version, signature }) {
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
        return true;
    }
        return false
    }
