import prisma from '@lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from "@lib/auth";
import { Role, StudyProgram } from '@prisma/client';
import { type NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams
    const programName = searchParams.get('name')
    const programTuition = searchParams.get('tuition')
    // const programDuration = searchParams.get('duration')
    const programDegree = searchParams.get('degree')
    const programLanguage = searchParams.get('language')
    const programAttendance = searchParams.get('attendance')
    const programFormat = searchParams.get('format')

    let whereClause: {
        name?: {},
        tuition?: {},
        // duration?: {},
        degree?: {},
        language?: {},
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
        whereClause.tuition = {
            contains: programTuition,
            mode: "insensitive"
        }
    }
    // if (programDuration) {
    //     whereClause.duration = {
    //         contains: programDuration,
    //         mode: "insensitive"
    //     }
    // }
    if (programDegree) {
        whereClause.degree = {
            contains: programDegree,
            mode: "insensitive"
        }
    }
    if (programLanguage) {
        whereClause.language = {
            contains: programLanguage,
            mode: "insensitive"
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
        statusText: "programs found"
    });
}