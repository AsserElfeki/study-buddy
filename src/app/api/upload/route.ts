import { v2 as cloudinary } from "cloudinary";

export async function GET(req, res) {
    const body = JSON.parse(req.body) || {};
    const { paramsToSign } = body;

    try {
        const signature = cloudinary.utils.api_sign_request(
            paramsToSign,
            process.env.CLOUDINARY_API_SECRET
        );
        return Response.json({ signature },
            {
                status: 200
            }
        );
    } catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
}

export async function POST(req, res) {
    const body = JSON.parse(req.body) || {};
    const { paramsToSign } = body;

    try {
        const signature = cloudinary.utils.api_sign_request(
            paramsToSign,
            process.env.CLOUDINARY_API_SECRET
        );
        return Response.json({ signature },
            {
                status: 200
            }
        );
    } catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
}