"use server"

import { authOptions } from '../lib/auth';
import prisma from '../lib/prisma';
import {  getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';
import { getSignature, validateSignature } from './_cloudinary';
import { $Enums, Application, applicationStatus, highestQualification } from '@prisma/client';



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
        data: users
    }
}

export async function getAllApplications() {
    const session = await getServerSession({ ...authOptions });
    const user = await session?.user;
    const isAdmin = user?.role === $Enums.Role.ADMIN;
    if (!isAdmin) return {
        success: false,
        error: "unauthorized"
    };
    let applications;
    try {
        applications = await prisma.application.findMany({
            include: {
                studyProgram: {
                    include: {
                        university: true
                    }
                },
                user: true
            }
        });
    } catch (error) {
        return {
            success: false,
            error
        }
    }
    console.log(applications)
    return {
        success: true,
        data: applications
    }
}

export async function getUserById(id: string) {

    const session = await getServerSession({ ...authOptions });
    const user = await session?.user;
    const isAdmin = user?.role === $Enums.Role.ADMIN;
    if (!isAdmin) return {
        success: false,
        error: "unauthorized"
    };
    let userById;
    try {
        userById = await prisma.user.findUnique({
            where: {
                id
            }
        });
    } catch (error) {
        return {
            success: false,
            error
        }
    }
    return {
        success: true,
        userById
    }
}


export async function banUser(userToBanId: string) {

    const session = await getServerSession({ ...authOptions });
    const user = await session?.user;
    const isAdmin = user?.role === $Enums.Role.ADMIN;
    if (!isAdmin) {
        return {
            success: false,
            error: "unauthorized"
        };
    }
    if (user.id === userToBanId) {
        return {
            success: false,
            error: "You cannot ban yourself"
        }
    }
    let userToBan;
    try {
        userToBan = await prisma.user.update({
            where: {
                id: userToBanId
            },
            data: {
                isActive: false
            }
        });
        revalidatePath('/users')
        return {
            success: true,
            data: userToBan
        }
    }
    catch (error) {
        return {
            success: false,
            error
        }
    }


}

export async function unbanUser(userToUnbanId: string) {

    const session = await getServerSession({ ...authOptions });
    const user = await session?.user;
    const isAdmin = user?.role === $Enums.Role.ADMIN;
    if (!isAdmin) {
        return {
            success: false,
            error: "unauthorized"
        };
    }
    let userToUnban;
    try {
        userToUnban = await prisma.user.update({
            where: {
                id: userToUnbanId
            },
            data: {
                isActive: true
            }
        });
        revalidatePath('/admin/users')
        return {
            success: true,
            data: userToUnban
        }
    }
    catch (error) {
        return {
            success: false,
            error
        }
    }
}

export async function updateApplicationStatus(id: string, status: string, path:string) {
    console.log("🚀 ~ updateApplicationStatus ~ path:", path)
    const session = await getServerSession({ ...authOptions });
    const user = await session?.user;
    const isAdmin = user?.role === $Enums.Role.ADMIN;
    if (!isAdmin) {
        return {
            success: false,
            error: "unauthorized"
        };
    }
    //convert status from strun to enum status
    let newStatus;
    switch (status) {
        case "accepted":
            newStatus = applicationStatus.accepted
            break;
        case "rejected":
            newStatus = applicationStatus.rejected
            break;
        case "pending":
            newStatus = applicationStatus.pending
        default:
            break;
    }
    if (!newStatus)
        return {
            success: false,
            error: "unknown status"
        }
    let application;
    try {
        application = await prisma.application.update({
            where: {
                id: id
            },
            data: {
                status: newStatus
            }
        });
        // revalidatePath(path)
        return {
            success: true,
            data: application
        }
    }
    catch (error) {
        return {
            success: false,
            error
        }
    }
}