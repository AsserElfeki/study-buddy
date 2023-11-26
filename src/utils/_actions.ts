"use server";


import { authOptions } from '@lib/auth';
import prisma from '@src/lib/prisma';
import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';


export async function getAllPosts(skip?: number, take?: number) {

    const session = await getServerSession({...authOptions});

    if (!session) {
        return null;
    }

    const user = session.user;
    // console.log("🚀 ~ file: actions.ts:16 ~ getAllPosts ~ user:", user)
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


export async function AddComment(formData : FormData, postId: string) {
    const content = formData.get('comment');
    // console.log("🚀 ~ file: actions.ts:60 ~ AddComment ~ content:", content)
    const session = await getServerSession({ ...authOptions });
    if (!session) {
        return null;
    }
    const user = session.user;
    console.log("🚀 ~ file: actions.ts:66 ~ AddComment ~ user:", user)
    if (!user.isActive) {
        return "inactive user";
    }
    const comment = await prisma.comment.create({
        data: {
            content: content as string,
            postId: postId,
            authorId: user.id
        }
    });
    revalidatePath('./forum')
    return comment;
}

export async function AddPost(formData: FormData) {
    const content = formData.get('content');
    const title = formData.get('title');
    // console.log("🚀 ~ file: actions.ts:60 ~ AddComment ~ content:", content)
    const session = await getServerSession({ ...authOptions });
    if (!session) {
        return null;
    }
    const user = session.user;
    console.log("🚀 ~ file: actions.ts:66 ~ AddComment ~ user:", user)
    if (!user.isActive) {
        return "inactive user";
    }
    const post = await prisma.post.create({
        data: {
            content: content as string,
            authorId: user.id,
            title: title as string
        }
    });
    revalidatePath('./forum')
    return post;
}

export async function likePost(postId: string) {
    // console.log("🚀 ~ file: actions.ts:60 ~ AddComment ~ content:", content)
    const session = await getServerSession({ ...authOptions });
    if (!session) {
        return null;
    }
    const user = session.user;
    if (!user.isActive) {
        return "inactive user";
    }
    const post =await prisma.post.update({
        where: {
            id: postId
        },
        data: {
            likes: {
                increment: 1
            }
        }
    });
    console.log("🚀 ~ file: actions.ts:108 ~ likePost ~ post:", post)

    revalidatePath('./forum')
    // return comment;

}
