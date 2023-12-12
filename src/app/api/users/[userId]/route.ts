
import prisma from '@lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from "@lib/auth";
import { Role, University, User } from '@prisma/client';
import { type NextRequest } from 'next/server';


/**
 * Retrieves the user data for a given user ID.
 * access: admin only
 *
 * @param {Request} req - the HTTP request object
 * @param {Object} params - the parameters object
 * @param {string} params.userId - the ID of the user to retrieve
 * @return {Promise<Response>} - a promise that resolves with the user data or an error response
 */
export async function GET(req: Request, { params }: { params: { userId: string } }) {
    //check if the user is an admin
    const session = await getServerSession(authOptions);
    const role = session?.user?.role;
    if (!session || role != Role.ADMIN) {
        return Response.json({
            message: 'You are not authorized to perform this action',
        }, {
            status: 401,
        });
    }

    let data: University;
    //retreive user 
    try {
        data = await prisma.university.findUnique({
            where: {
                id: params.userId,
            }
        });
    } catch (error) {
        // console.log("🚀 ~ file: route.ts:21 ~ GET ~ error", error)
        return Response.json({
            message: 'error while retrieving data',
        }, {
            status: 400,
        });
    }

    if (!data) {
        return Response.json({
            message: 'No user found',
        }, {
            status: 404,
            statusText: `could not find user with id ${params.userId}`
        });
    }
    return Response.json(data, {
        status: 200,
        statusText: `Found user with id ${params.userId}`
    });
}


/**
 * Updates a user in the database.
 * access: admin only
 *
 * @param {Request} req - The request object.
 * @param {Object} params - The parameters object.
 * @param {string} params.userId - The ID of the user to update.
 * @return {Promise<Response>} The response object containing the updated user.
 */
export async function PUT(req: Request, { params }: { params: { userId: string } }) {
    //check if the user is an admin
    const session = await getServerSession(authOptions);
    const role = session?.user?.role;
    if (!session || role != Role.ADMIN) {
        return Response.json({
            message: 'You are not authorized to perform this action',
        }, {
            status: 401,
            statusText: `You are not authorized to perform this action`
        });
    }

    //get the body of the request
    const data = await req.json();
    let userExists = await prisma.user.findUnique({
        where: {
            id: params.userId
        }
    })
    if (!userExists) {
        return Response.json({
            message: 'No user found',
        }, {
            status: 404,
            statusText: `could not find user with id ${params.userId}`
        });
    }
    let updatedUser : User;

    //add new user to db
    try {
        updatedUser = await prisma.user.update({
            where: {
                id: params.userId
            },
            data: data
        });
    } catch (error) {
        // console.log("🚀 ~ file: route.ts:21 ~ GET ~ error", error)
        return Response.json({
            message: 'error while updating data',
        }, {
            status: 400,
        });
    }
    return Response.json(updatedUser, {
        status: 200,
        statusText: `Updated user with id ${params.userId}`
    });
}

/**
 * Deletes a user from the database.
 * access: admin only
 *
 * @param {Request} req - the HTTP request object
 * @param {{ params: { userId: string } }} params - the request parameters containing the user ID
 * @return {Promise<Response>} a response with the deleted user object or an error message
 */
export async function DELETE(req: Request, { params }: { params: { userId: string } }) {
    //check if the user is an admin
    const session = await getServerSession(authOptions);
    const role = session?.user?.role;
    if (!session || role != Role.ADMIN) {
        return Response.json({
            message: 'You are not authorized to perform this action',
        }, {
            status: 401,
            statusText: `You are not authorized to perform this action`
        });
    }

    let userExists = await prisma.user.findUnique({
        where: {
            id: params.userId
        }
    })
    if (!userExists) {
        return Response.json({
            message: 'No user found',
        }, {
            status: 404,
            statusText: `could not find user with id ${params.userId}`
        });
    }
    let deletedUser : User;

    //add new user to db
    try {
        deletedUser = await prisma.user.delete({
            where: {
                id: params.userId
            }
        });
    } catch (error) {
        // console.log("🚀 ~ file: route.ts:21 ~ GET ~ error", error)
        return Response.json({
            message: 'error while deleting data',
        }, {
            status: 400,
        });
    }
    return Response.json(deletedUser, {
        status: 200,
        statusText: `Deleted user with id ${params.userId}`
    });
}