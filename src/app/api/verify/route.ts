// import jwt from "jsonwebtoken";
// import prisma from "@lib/prisma";
// import { NextApiRequest, NextApiResponse } from 'next';
// export async function GET(req , res) {
//     console.log("verification in place")
//     const token = req.query.token as string; 
//     console.log(token)
//     if (!token) {
//         return res.status(400).send("No token provided");
//     }

import { NextApiRequest } from 'next';

//     try {
//         const decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET);
//         const {id} = decoded.id;
//         await prisma.user.update({
//             where: {
//                 id: id,
//             },
//             data: {
//                 emailVerified: new Date(),
//             },
//         })

//         res.redirect('../auth/login?verified=true');
//         console.log("Email verified");
//     } catch (error) {
//         //verification of an email when GoogleOAuth
//         try {
//             const decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET);
//             const provAccountId = decoded.id;
//             const account = await prisma.account.findFirst({
//                 where: {
//                     providerAccountId: provAccountId,
//                 }
//             })

//             await prisma.user.update({
//                 where: {
//                     id: account.userId,
//                 },
//                 data: {
//                     emailVerified: new Date(),
//                 },
//             })

//             console.log("Email verified");
//             res.redirect('/');
//         }
//         catch (error) {
//             return res.status(401).send("Invalid or expired token");
//         }
//     }
// }



export async function GET(req: NextApiRequest) {
    const { token } = req.query
    if (!token) {
        // return new NextApiResponse.status(400).send("No token provided");
    }

    
}