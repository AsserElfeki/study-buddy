"use server"

import prisma from './prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@lib/auth';
import { StudyProgram } from '@prisma/client';


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
    console.log("🚀 ~ file: route.ts:30 ~ GET ~ user:", user.favorites)

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
            comments: {
                include: {
                    author: true
                }
            },
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
            studyProgram: true,

        }
    })
    console.log("🚀 ~ file: _profile.ts:60 ~ getMyapplications ~ applications:", applications)

    //return user
    return {
        success: true,
        data: applications
    }
}


export async function getApplication(applicationId: string) {
    // authorize user first, and follow same logic as above 
    const session = await getServerSession(authOptions);
    if (!session) {
        return {
            success: false,
            message: "You are not logged in",
            status: 401
        };
    }

    const applications = await prisma.application.findUnique({
        where: {
            id: applicationId
        },
        include: {
            studyProgram: true,
            documents: true,
            personalInfo: true,
            educationalBackground: true,

        }
    });
    // console.log("🚀 ~ file: _profile.ts:60 ~ getMyapplications ~ applications:", applications);

    // return user
    return {
        success: true,
        data: applications
    };
    
}

// function that takes program id and finds if an application exists for this user and this program
export async function getApplicationByProgramId(programId: string) {
    // authorize user first, and follow same logic as above 
    const session = await getServerSession(authOptions);
    if (!session) {
        return {
            success: false,
            message: "You are not logged in",
            status: 401
        };
    }

    const application = await prisma.application.findFirst({
        where: {
            userId: session.user.id,
            studyProgramId: programId
        },
        include: {
            studyProgram: true,
            documents: true,
            personalInfo: true,
            educationalBackground: true,
        }
    });
    // console.log("🚀 ~ file: _profile.ts:60 ~ getMyapplications ~ applications:", applications);

    if (!application) {
        return {
            success: false,
            message: "Application not found",
            status: 404
        };
    }
    // return user
    return {
        success: true,
        data: application
    };
    
}

export async function getMyFavourites() {
    const session = await getServerSession(authOptions);
    // console.log("session in API:", session);
    if (!session) {
        return {
                success: false,
                message: "You are not logged in",
                status: 401
            };
    }

    const user = await prisma.user.findUnique({
        where: {
            id: session.user.id
        },
    })
    //get each program that the user has in their favorites
    let programs: StudyProgram[] = [];
    for (const fav of user.favorites) {
        const program = await prisma.studyProgram.findUnique({
            where: {
                id: fav
            },
            include: {
                university: true
            }
        })
        programs.push(program);
    }
    
    console.log("🚀 ~ file: _profile.ts:209 ~ getMyFavourites ~ programs:", programs)
    
    //return user
    return {
        success: true,
        data: programs,
        status: 200,
        count: programs.length
    };
}