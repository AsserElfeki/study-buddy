import { StudyProgram } from '@prisma/client';
import prisma from '@src/lib/prisma'
import { NextRequest } from 'next/server'



// get all disciplines
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
                disciplineOnProgram: {
                    include: {
                        studyProgram: true,
                    }
                }
            }
        })
    }
    catch (error) {
        console.log("🚀 ~ file: disciplines/route.ts:32 ~ GET ~ error", error)
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