// universities/route.ts

import prisma from '@lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from "@lib/auth";
import { Role } from '@prisma/client';
import { type NextRequest } from 'next/server';


export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams
    const uniName = searchParams.get('name')
    const uniLocation = searchParams.get('location')
    let whereClause: { location?: {  }, name?: {  } } = {}
    if (uniName) {
        whereClause.name = {
            contains: uniName,
            mode: "insensitive"
        }
    }
    if (uniLocation) {
        whereClause.location = {
            contains: uniLocation,
            mode: "insensitive"
        }
    }

    //retreive all universities that match fronm db 
    const universities = await prisma.university.findMany({
        where: whereClause
    });
    if (universities.length == 0) {
        return Response.json({
            message: 'No universities found',
        }, {
            status: 404,
        });
    }
    return Response.json(universities, {
        status: 200,
        statusText: `Found ${universities.length} universities`
    });
}


//post for admin only
export async function POST(req: Request) {
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
    const newUni = await req.json();

    //check if the university already exists
    const uniExists = await prisma.university.findFirst({
        where: {
            name: newUni.name,
            location: newUni.location,
        },
    });

    if (uniExists) {
        return Response.json({
            message: 'University already exists',
        }, {
            status: 400,
        });
    }
    else {
        //create the university
        const createdUni = await prisma.university.create({
            data: {
                name: newUni.name,
                location: newUni.location,
            },
        });

        return Response.json(createdUni, {
            status: 201,
            statusText: 'University created successfully',
        });
    }

}