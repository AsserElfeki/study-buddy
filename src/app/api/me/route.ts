import prisma from '@lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@lib/auth';
import { type NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    //check if user is authenticated and authorized
    const session = await getServerSession(authOptions);
    console.log("session in API:", session);
    // if (!session) {
    //     return Response.json(
    //         {
    //             success: false,
    //             message: "You are not logged in",
    //             status: 401
    //         });
    // }

    const user = await prisma.user.findUnique({
        where: {
            id: session.user.id
        },
        // include all applications, all favourites, all posts, all notifications
        include: {
            applications: true,
            posts: true,
            notifications: true
        }
    })

    //return user
    return Response.json(
        {
            success: true,
            user: user,
            status: 200
        }
    );
}


export async function POST() {

}

export async function PUT() {

}