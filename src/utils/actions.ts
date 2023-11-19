"use server";
import { authOptions } from '@lib/auth';

import prisma from '@src/lib/prisma';
import { getServerSession } from 'next-auth';


export async function getAllPosts(skip: number, take: number) {

    const session = await getServerSession({...authOptions});

    if (!session) {
        return null;
    }

    const user = session.user;
    console.log("🚀 ~ file: actions.ts:16 ~ getAllPosts ~ user:", user)
    //check if user isActive
    if (!user.isActive) {
        return "inactive user";
    }

    const posts = await prisma.post.findMany(
        {
            skip,
            take,
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                author: {
                    select: {
                        firstName: true,
                        lastName: true,
                        image: true
                    }
                },
                comments: {
                    include: {
                        author: {
                            select: {
                                firstName: true,
                                lastName: true,
                                image: true
                            }
                        },
                    }
                },
            }
        }
    );

    return posts;
    
}
