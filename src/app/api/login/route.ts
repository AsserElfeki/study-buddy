import prisma from '../../../lib/prisma'
//import { getSession } from 'next-auth/react'
import { comparePassword } from '../../../lib/hashPasswords'
import { NextResponse } from 'next/server'

export async function POST(req: Request,) {
    console.log("POST func fired")
    const { email, password } = await req.json()
    const user = await prisma.user.findUnique({
        where: {
            email: email
        }
    })
    
    console.log("User: ",user)
    // compare hashes
    let compareResult = false;

    if (user && password && user.password) {
        compareResult = await comparePassword(password, user.password)
        
        console.log(compareResult)
    }

    
    if (compareResult) {
        console.log("found user")
        return new NextResponse(
            JSON.stringify({ status: "success", message: "Welcome back", data: user }),
            { status: 201 }
        );
    } else {
        return new NextResponse(
            JSON.stringify({ status: "fail", message: "You are not logged in", data: null }),
            { status: 401 }
        );
    }
}
