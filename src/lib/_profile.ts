"use server"

import prisma from './prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@lib/auth';


export async function getMyprofile() {
    
    const session = await getServerSession(authOptions);
    // console.log("session in API:", session);
    if (!session) {
        return Response.json(
            {
                success: false,
                message: "You are not logged in",
                status: 401
            });
    }

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
    // console.log("🚀 ~ file: route.ts:30 ~ GET ~ user:", user)

    //return user
    return Response.json(user,
        {
            status: 200,
            statusText: "true",
        },
    );
}

export async function getMyPosts() {
    const session = await getServerSession(authOptions);
    // console.log("session in API:", session);
    if (!session) {
        return {
                success: false,
                message: "You are not logged in",
                status: 401
            };
    }

    const posts = await prisma.post.findMany({
        where: {
            authorId: session.user.id
        },
        include: {
            author: true,
            comments: true,
            likes: true,
            _count: true
        }
    })
    // console.log("🚀 ~ file: _profile.ts:60 ~ getMyPosts ~ posts:", posts)
    // console.log("🚀 ~ file: route.ts:30 ~ GET ~ user:", user)

    //return user
    return {
        success: true,
        data: posts
    }
}

export async function getMyapplications() {
    const session = await getServerSession(authOptions);
    // console.log("session in API:", session);
    if (!session) {
        return {
                success: false,
                message: "You are not logged in",
                status: 401
            };
    }

    const applications = await prisma.application.findMany({
        where: {
            userId: session.user.id
        },
        include: {
            user: true,
        }
    })
    console.log("🚀 ~ file: _profile.ts:60 ~ getMyapplications ~ applications:", applications)

    //return user
    return {
        success: true,
        data: applications
    }
}