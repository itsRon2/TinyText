import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import {authOptions} from '@/app/api/auth/[...nextauth]/route'

export async function GET(request) {
    const session = await getServerSession(authOptions);
    console.log("get api", session)
    return NextResponse.json({ authenticated: !!session })
}