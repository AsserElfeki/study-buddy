import nodemailer, { TransportOptions } from "nodemailer";
import { User } from "@prisma/client";
import jwt, { Secret } from "jsonwebtoken";

/**
 * Generate a JWT token for a user.
 * 
 * @param user - The user object.
 * @returns The generated JWT token.
 */
const generateToken = (user: { id: string, email: string }): string => {
    const payload = {
        id: user.id,
        email: user.email,
    };
    const secret: Secret = process.env.NEXTAUTH_SECRET;
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
} as TransportOptions);

/**
 * Sends a verification email to a user.
 * 
 * @param user - The user object containing the necessary details.
 * @returns A promise that resolves when the email is sent successfully, or rejects with an error if there was an issue sending the email.
 */
export default async function sendVerificationEmail(user: User): Promise<void> {
    const verificationLink = `http://localhost:3000/api/verify?token=${generateToken(user)}`;
    console.log("send mail func")
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
