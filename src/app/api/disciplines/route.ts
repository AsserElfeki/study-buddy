import { authOptions } from '@src/lib/auth'
import prisma from '@src/lib/prisma'
import { getServerSession } from 'next-auth'
import { NextRequest } from 'next/server'

/**
 * Retrieves disciplines based on the provided search parameters.
 * access: public
 *
 * @param {NextRequest} req - The request object.
 * @return {Promise<Response>} A promise that resolves to the response object.
 */
export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams
    const disciplineName = searchParams.get('name')

    let whereClause: {
        name?: {},
    } = {}

    if (disciplineName) {
        whereClause.name = {
            contains: disciplineName,
            mode: "insensitive"
        }
    }

    let disciplines = []
    try {

        disciplines = await prisma.discipline.findMany({
            where: whereClause,
            include: {
                disciplineOnProgram: true,
            }
        })
    }
    catch (error) {
        // console.log("🚀 ~ file: disciplines/route.ts:32 ~ GET ~ error", error)
        return Response.json({
            message: 'error while retrieving data',
        }, {
            status: 400,
        });
    }
    if (disciplines.length == 0) {
        return Response.json({
            message: 'No disciplines found',
        }, {
            status: 404,
        });
    }
    return Response.json(disciplines, {
        status: 200,
        statusText: `Found ${disciplines.length} disciplines`
    });
}

/**
 * Handles the POST request for creating a new discipline.
 * access: admin only
 *
 * @param {NextRequest} req - The request object.
 * @return {Promise<Response>} The response with the created discipline or an error message.
 */
export async function POST(req: NextRequest) {
    //check if the user is an admin
    const session = await getServerSession({ req, ...authOptions })
    const role = session?.user?.role;
    if (!session || role != 'ADMIN') {
        return Response.json({
            message: 'You are not authorized to perform this action',
        }, {
            status: 401,
        });
    }

    //get the body of the request
    const data = await req.json();
    let newDiscipline;
    //add new discipline to db
    try {
        newDiscipline = await prisma.discipline.create({
            data: data
        });
    }
    catch (error) {
        // console.log("🚀 ~ file: disciplines/route.ts:32 ~ GET ~ error", error)
        return Response.json({
            message: 'error while adding data',
        }, {
            status: 400,
        });
    }
    return Response.json(newDiscipline, {
        status: 200,
        statusText: 'Discipline added successfully'
    });
}