import jwt from "jsonwebtoken";
import prisma from "@lib/prisma";
import { NextApiRequestQuery } from 'next/dist/server/api-utils';
import { NextApiRequest } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import { useRouter } from 'next/router';
// import { NextApiRequest, NextApiResponse } from 'next';
export async function GET(req: NextRequest) {
    console.log("verification in place")
    const token = req.nextUrl.searchParams.get("token");
    console.log("token:", token)
    if (!token) {
        return NextResponse.json(
            {
                message: "No token provided",
                status: 400
            }
        );
    }


    try {
        const decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET);
        console.log("decoded:", decoded)
        const id = decoded.id;
        await prisma.user.update({
            where: {
                id: id,
            },
            data: {
                emailVerified: new Date(),
            },
        })
        console.log("founf at first try")
        return NextResponse.redirect(new URL('', process.env.NEXTAUTH_URL))
        // res.redirect('../auth/login?verified=true');
        console.log("Email verified");
    } catch (error) {
        //verification of an email when GoogleOAuth
        console.log(error.message)
        try {
            const decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET);
            const provAccountId = decoded.id;
            const account = await prisma.account.findFirst({
                where: {
                    providerAccountId: provAccountId,
                }
            })

            await prisma.user.update({
                where: {
                    id: account.userId,
                },
                data: {
                    emailVerified: new Date(),
                },
            })

            console.log("Email verified");
            return NextResponse.redirect(new URL('/profile'));
        }
        catch (error) {
            return NextResponse.json({
                message: error.message,
                status: 401
            })
        }
    }
}



// export async function GET(req: NextApiRequest) {
//     const { token } = req.query
//     if (!token) {
//         // return new NextApiResponse.status(400).send("No token provided");
//     }


