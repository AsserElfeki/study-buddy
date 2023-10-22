import { Role, StudyProgram } from '@prisma/client';
import prisma from '@lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@lib/auth';

export async function GET(req: Request, { params }: { params: { programId: string } }) {
    let studyProgram : StudyProgram;
    //get the study program from db
    console.log("Get request")
    try {
        studyProgram = await prisma.studyProgram.findUnique({
            where: {
                id: params.programId
            }
        });
    }
    catch (error) {
        console.log("🚀 ~ file: route.ts:21 ~ GET ~ error", error)
        return Response.json({
            message: 'error while fetching data',
        }, {
            status: 400,
        });
    }
    return Response.json(studyProgram, {
        status: 200,
        statusText : 'Study program fetched successfully'
    });
}
    

export async function PUT(req: Request, { params }: { params: { programId: string } }) {
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
    let updatedStudyProgram : StudyProgram;
    //add new study program to db
    try {
        updatedStudyProgram = await prisma.studyProgram.update({
        where: {
            id: params.programId
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
    return Response.json(updatedStudyProgram, {
        status: 201,
        statusText : 'Study program updated successfully'
    });
}

//delete for admin only
export async function DELETE(req: Request, { params }: { params: { programId: string } }) {
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
    let deletedStudyProgram : StudyProgram;
    //delete study program from db
    try {
        deletedStudyProgram = await prisma.studyProgram.delete({
        where: {
            id: params.programId
        }
        });
    }
    catch (error) {
        console.log("🚀 ~ file: route.ts:21 ~ GET ~ error", error)
        return Response.json({
            message: 'error while deleting data',
        }, {
            status: 400,
        });
    }
    return Response.json(deletedStudyProgram, {
        status: 201,
        statusText : 'Study program deleted successfully'
    });
}