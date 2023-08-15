import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

//this is how to get session on an api route (so for endpoints)

export async function GET(request: Request) {
    const session = await getServerSession(authOptions);

    return NextResponse.json({
        authenticated: !!session, //the !! to convert the object to boolean (if exists then 1)
        session,
    });
}
