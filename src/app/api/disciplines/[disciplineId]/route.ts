import { getServerSession } from 'next-auth';
import { authOptions } from '@lib/auth';
import { Discipline, Role, StudyProgram } from '@prisma/client';
import prisma from '@lib/prisma';

/**
 * Retrieves a discipline from the database based on the given discipline ID.
 * access: public
 *
 * @param {Request} req - the request object
 * @param {{ params: { disciplineId: string } }} - an object containing the discipline ID
 * @return {Promise<Response>} - a Promise that resolves to the fetched discipline
 */
export async function GET(req: Request, { params }: { params: { disciplineId: string } }) {
    let discipline: Discipline;
    //get the discipline from db
    try {
        discipline = await prisma.discipline.findUnique({
            where: {
                id: params.disciplineId
            }, 
            include: {
                disciplineOnProgram: {
                    include: {
                        studyProgram: true
                    }
                }
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

/**
 * Updates a discipline in the database.
 * access: admin only
 *
 * @param {Request} req - the HTTP request object
 * @param {{ params: { disciplineId: string } }} - an object containing the disciplineId parameter
 * @return {Promise} a promise that resolves to the updated discipline object
 */
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

/**
 * Deletes a discipline from the database. and cascades to all its relations.
 * access: admin only
 *
 * @param {Request} req - The request object.
 * @param {{ params: { disciplineId: string } }} - The parameters object containing the discipline ID.
 * @return {Promise<Response>} - A Promise that resolves to a Response object with the result of the deletion.
 */
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