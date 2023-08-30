import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import { User } from "@prisma/client";

const generateToken = (user: User) => {
    const payload = {
        id: user.id,
        email: user.email,
    };
    const secret = process.env.NEXTAUTH_SECRET;
    const options = {
        expiresIn: "1h",
    };
    return jwt.sign(payload, secret, options);
};

// create a Nodemailer transporter
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SERVER_HOST,
    port: process.env.EMAIL_SERVER_PORT,
    auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
    },
});

export default async function sendVerificationEmail(user) {
    const verificationLink = `http://localhost:3000/api/verify?token=${generateToken(user)}`;

    const mailOptions = {
        from: process.env.EMAIL_FROM,
        to: user.email,
        subject: "Please verify your email address",
        html: `<p>Hi ${user.firstName},</p><p>Please click the following link to verify your email address:</p><a href="${verificationLink}">${verificationLink}</a>`,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Verification email sent to ${user.email}`);
    } catch (error) {
        console.error(`Error sending verification email to ${user.email}: ${error}`);
    }
}
