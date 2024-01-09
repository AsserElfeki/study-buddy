"use server"

import { authOptions } from '../lib/auth';
import prisma from '../lib/prisma';
import { Session, getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';
import { getSignature, validateSignature } from './_cloudinary';
import { $Enums, Application, highestQualification } from '@prisma/client';



export async function getAllUsers() {

    const session = await getServerSession({ ...authOptions });
    const user = await session?.user;
    const isAdmin = user?.role === $Enums.Role.ADMIN;
    if (!isAdmin) return {
        success: false,
        error: "unauthorized"
    };
    let users;
    try {
        users = await prisma.user.findMany();
    } catch (error) {
        return {
            success: false,
            error
        }
    }
    return {
        success: true,
        users
    }
}