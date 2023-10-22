import { getServerSession } from 'next-auth';
import { authOptions } from '@lib/auth';
import { Discipline, Role, StudyProgram } from '@prisma/client';
import prisma from '@lib/prisma';

export async function GET(req: Request, { params }: { params: { disciplineId: string } }) {
    let discipline: Discipline;
    //get the discipline from db
    try {
        discipline = await prisma.discipline.findUnique({
            where: {
                id: params.disciplineId
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
    return Response.json(discipline, {
        status: 200,
        statusText: 'Discipline fetched successfully'
    });
}


export async function PUT(req: Request, { params }: { params: { disciplineId: string } }) {
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
    let updatedDiscipline: Discipline;
    //add new study program to db
    try {
        updatedDiscipline = await prisma.discipline.update({
            where: {
                id: params.disciplineId
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
    return Response.json(updatedDiscipline, {
        status: 201,
        statusText: 'Discipline updated successfully'
    });
}

//delete for admin only
export async function DELETE(req: Request, { params }: { params: { disciplineId: string } }) {
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

    //delete the discipline from db
    try {
        await prisma.discipline.delete({
            where: {
                id: params.disciplineId
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
    return Response.json({
        message: 'Discipline deleted successfully, and all its relations',
    }, {
        status: 200,
        statusText: 'Discipline deleted successfully'
    });
}