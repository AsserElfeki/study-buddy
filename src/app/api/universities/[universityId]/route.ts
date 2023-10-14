import prisma from '@lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from "@lib/auth";
import { Role, University } from '@prisma/client';
import { type NextRequest } from 'next/server';
import { Program } from '@src/types/dataPrep';


export async function GET(req: Request, { params } : { params: { universityId: string } }) {
    let data : University;
    const uniId = params.universityId;
    console.log("🚀 ~ file: route.ts:12 ~ GET ~ uniId:", uniId)
    //retreive university that match fronm db
    try {
        data = await prisma.university.findUnique({
            where: {
                id: uniId
            }
        });
    } catch (error) {
        console.log("🚀 ~ file: route.ts:21 ~ GET ~ error", error)
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
        });
    }
    return Response.json(data, {
        status: 200,
    });
}

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
        console.log("🚀 ~ file: route.ts:21 ~ GET ~ error", error)
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

//delete for admin only
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
        console.log("🚀 ~ file: route.ts:21 ~ GET ~ error", error)
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