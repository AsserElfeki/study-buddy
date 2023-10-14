import prisma from '@lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from "@lib/auth";
import { Role, StudyProgram, studyProgramLanguage } from '@prisma/client';
import { type NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams
    const programName = searchParams.get('name')
    const programTuition: number = parseFloat(searchParams.get('tuition'))
    const programDuration: number = parseFloat(searchParams.get('duration'))
    const programDegree = searchParams.get('degree')
    const programLanguage = searchParams.get('language')
    const programAttendance = searchParams.get('attendance')
    const programFormat = searchParams.get('format')

    let whereClause: {
        name?: {},
        tuitionFee?: {},
        duration?: {},
        degreeType?: {},
        language?: string,
        attendance?: {},
        format?: {}
    } = {}

    if (programName) {
        whereClause.name = {
            contains: programName,
            mode: "insensitive"
        }
    }
    if (programTuition) {
        whereClause.tuitionFee = {
            lte: programTuition,
        }
    }
    if (programDuration) {
        whereClause.duration = {
            lte: programDuration,
        }
    }
    if (programDegree) {
        whereClause.degreeType = {
            contains: programDegree,
            mode: "insensitive"
        }
    }
    if (programLanguage) {
        if (programLanguage.includes("en")) {
            whereClause.language = studyProgramLanguage.EN
        }
        else if (programLanguage.includes("pl")) {
            whereClause.language = studyProgramLanguage.PL
        }
    }
    if (programAttendance) {
        whereClause.attendance = {
            contains: programAttendance,
            mode: "insensitive"
        }
    }
    if (programFormat) {
        whereClause.format = {
            contains: programFormat,
            mode: "insensitive"
        }
    }

    console.log("🚀 ~ file: route.ts:18 ~ GET ~ whereClause:", whereClause)

    let programs: StudyProgram[];
    //retreive all universities that match fronm db 
    try {
        programs = await prisma.studyProgram.findMany({
            where: whereClause
        });
    }
    catch (error) {
        console.log("🚀 ~ file: route.ts:21 ~ GET ~ error", error)
        return Response.json({
            message: 'error while retrieving data',
        }, {
            status: 400,
        });
    }
    if (programs.length == 0) {
        return Response.json({
            message: 'No programs found',
        }, {
            status: 404,
        });
    }
    return Response.json(programs, {
        status: 200,
        statusText: `Found ${programs.length} programs`
    });
}

//post only for admin
export async function POST(req: NextRequest) {
    const session = await getServerSession({ req, ...authOptions })
    if (!session || session.user.role !== Role.ADMIN) {
        return Response.json({
            message: 'Unauthorized',
        }, {
            status: 401,
        });
    }
    const body = await req.json()
    let program: StudyProgram;
    const lang = body.studyProgramLanguage
    if (lang){
        if (lang.includes("en")) {
            body.language = studyProgramLanguage.EN
        }
        else {
            body.language = studyProgramLanguage.PL
        }
    }
    try {
        program = await prisma.studyProgram.create({
            data: {
                name: body.name,
                description: body.description,
                startDate: body.startDate,
                studyProgramLanguage: body.language,
                degreeType: body.degreeType,
                format: body.format,
                attendance: body.attendance,
                applyDate: body.applyDate,
                paymentCycle: body.paymentCycle,
                studyProgramLink: body.studyProgramLink,
                tuitionFee: body.tuitionFee,
                IELTSScore: body.IELTSScore,
                TOEFLScore: body.TOEFLScore,
                duration: body.duration,
                university: {
                    connect: {
                        id: body.universityId
                    }
                }
            }
        });
    }
    catch (error) {
        console.log("🚀 ~ file: route.ts:21 ~ GET ~ error", error)
        return Response.json({
            message: 'error while retrieving data',
        }, {
            status: 400,
        });
    }
    return Response.json(program, {
        status: 200,
        statusText: `Created program ${program.name}`
    });
}