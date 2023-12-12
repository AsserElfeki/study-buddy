import prisma from '@lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from "@lib/auth";
import { Role, University } from '@prisma/client';
import { type NextRequest } from 'next/server';


/**
 * Retrieves a specific university from the database based on the provided university ID.
 * access: public
 *
 * @param {Request} req - The HTTP request object.
 * @param {{ params: { universityId: string } }} - The object containing the university ID as a parameter.
 * @return {Promise<Response>} - The response object containing the retrieved university data.
 */
export async function GET(req: Request, { params } : { params: { universityId: string } }) {
    let data : University;
    //retreive university that match fronm db
    try {
        data = await prisma.university.findUnique({
            where: {
                id: params.universityId,
            },
            include: {
                studyPrograms: true,
            }
        });
        // console.log("🚀 ~ file: route.ts:28 ~ GET ~ data:", data)
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
            message: 'No university found',
        }, {
            status: 404,
            statusText: `could not find university with id ${params.universityId}`
        });
    }
    
    return Response.json(data, {
        status: 200,
        statusText: `Found university with id ${params.universityId}`
    });
}

/**
 * Update a university in the database.
 * access: admin only
 *
 * @param {Request} req - The request object.
 * @param {Object} params - The parameters object containing the universityId.
 * @param {string} params.universityId - The ID of the university to update.
 * @return {Promise<Response>} The response containing the updated university.
 */
export async function PUT(req: Request, { params }: { params: { universityId: string } }) {
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

    //get the body of the request
    const data = await req.json();
    let updatedUniversity : University;
    //add new university to db
    try {
        updatedUniversity = await prisma.university.update({
        where: {
            id: params.universityId
        },
        data: data
        });
    }
    catch (error) {
        // console.log("🚀 ~ file: route.ts:21 ~ GET ~ error", error)
        return Response.json({
            message: 'error while updating data',
        }, {
            status: 400,
        });
    }
    return Response.json(updatedUniversity, {
        status: 201,
        statusText : 'University updated successfully'
    });
}


/**
 * Deletes a university from the database.
 * access: admin only
 *
 * @param {Request} req - The request object.
 * @param {{ params: { universityId: string } }} params - The parameters object containing the university ID to delete.
 * @return {Promise<Response>} The response object.
 */
export async function DELETE(req: Request, { params }: { params: { universityId: string } }) {
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
    let deletedUniversity : University;
    //delete university from db
    try {
        deletedUniversity = await prisma.university.delete({
            where: {
                id: params.universityId
            }
        });
    }
    catch (error) {
        // console.log("🚀 ~ file: route.ts:21 ~ GET ~ error", error)
        return Response.json({
            message: 'error while retreiving data',
        }, {
            status: 400,
        });
    }
    return Response.json(deletedUniversity ,{
        statusText: 'University deleted successfully',
        status: 200,
    });
}