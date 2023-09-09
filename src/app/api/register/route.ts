import { prisma } from "@lib/prisma";
import { hashPassword } from '@src/lib/hashPasswords';
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { firstName, lastName, email, password } = (await req.json()) as {
            firstName: string;
            lastName: string;
            email: string;
            password: string;
        };
        const hashed_password = await hashPassword(password);

        const user = await prisma.user.create({
            data: {
                firstName: firstName,
                lastName: lastName,
                email: email.toLowerCase(),
                password: hashed_password,
            },
        });

        return NextResponse.json({
            user: {
                name: user.firstName +" " + user.lastName,
                email: user.email,
            },
            status: 200,
            
        });
    } catch (error: any) {
        console.log("error in register function")
        return new NextResponse(
            JSON.stringify({
                status: "error",
                message: error.message,
            }),
            { status: 500 }
        );
    }
}
