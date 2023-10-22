import { prisma } from '@lib/prisma';
import { Role } from '@prisma/client';
import { authOptions } from '@src/lib/auth';
import { User, getServerSession } from 'next-auth';
import { NextRequest } from 'next/server';

//handle GET requests to list all users, admin only
export async function GET(req: NextRequest) {
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
    let whereClause: {
        firstName?: {},
        lastName?: {},
        email?: {},
        sex?: string,
        isActive?: boolean,
        role?: Role,
    } = {};

    const searchParams = req.nextUrl.searchParams;
    if (searchParams.has('firstName')) {
        whereClause.firstName = {
            contains: searchParams.get('firstName') as string,
            mode: "insensitive"
        };
    }
    if (searchParams.has('lastName')) {
        whereClause.lastName = {
            contains: searchParams.get('lastName') as string,
            mode: "insensitive"
        }
    }
    if (searchParams.has('email')) {
        whereClause.email = {
            contains: searchParams.get('email') as string,
            mode: "insensitive"
        }
    }
    if (searchParams.has('sex')) {
        whereClause.sex = searchParams.get('sex');
    }
    if (searchParams.has('isActive')) {
        whereClause.isActive = searchParams.get('isActive') == 'true';
    }
    if (searchParams.has('userRole')) {
        switch (searchParams.get('userRole').toUpperCase()) {
            case 'ADMIN':
                whereClause.role = Role.ADMIN;
                break;
            case 'NEW_STUDENT':
                whereClause.role = Role.NEW_STUDENT;
                break;
            case 'ACCEPTED_STUDENT':
                whereClause.role = Role.ACCEPTED_STUDENT;
                break;
            case 'COMMUNITY_ANGEL':
                whereClause.role = Role.COMMUNITY_ANGEL;
                break;
            default:
                break;
        }
    }

    //retreive all users from db
    const users = await prisma.user.findMany({
        where: whereClause
    });
    if (users.length == 0) {
        return Response.json({
            message: 'No users found',
        }, {
            status: 404,
            statusText: `Found ${users.length} users`
        });
    }
    return Response.json(users, {
        status: 200,
        statusText: `Found ${users.length} users`
    });
}

//handle POST requests to create a new user, admin only
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
    const user = await req.json();
    //check if the user already exists
    const userExists = await prisma.user.findUnique({
        where: {
            email: user.email
        }
    })
    if (userExists) {
        console.log("🚀 ~ file: route.ts:112 ~ POST ~ userExists:", userExists)
        
        return Response.json({
            message: 'This email is assigned to another user',
        }, {
            status: 400,
        });
    }

    let createdUser: User;

    //add new user to db
    try {
        createdUser = await prisma.user.create({
            data: user
        });
    } catch (error) {
        console.log("🚀 ~ file: route.ts:21 ~ GET ~ error", error)
        return Response.json({
            message: 'error while creating user',
        }, {
            status: 400,
        });
    }
    return Response.json(createdUser, {
        status: 201,
        statusText: 'User updated successfully'
    });
}