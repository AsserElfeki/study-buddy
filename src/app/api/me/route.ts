import { authOptions } from '@src/lib/auth';
import prisma from '@src/lib/prisma';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export async function GET() {
    //check if user is authenticated and authorized
    const session = await getServerSession(authOptions);
    if (!session) {
        return new NextResponse(
            JSON.stringify(
                {
                    success: false,
                    message: "You are not logged in"
                }),
            { status: 401 }
        );
    }
   
    const user = await prisma.user.findUnique({
        where: {
            id: session.user.id
        },
        // include all applications, all favourites, all posts, all notifications
        include: {
            applications: true,
            favorites: true,
            posts: true,
            notifications: true,
            friendList: true,
            
        }

    })

}


export async function POST() {
    
}

export async function PUT() {
    
}