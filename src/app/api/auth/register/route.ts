/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { createUser } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req : NextRequest){
    try {
        const {fullname , username , email , password} = await req.json();
        const {user} = await createUser(email,password , username , fullname);
        return NextResponse.json({user : {id: user.id, email: user.email, username: user.username}})
    } catch (error : any) {
        return NextResponse.json({ error: error?.message }, { status: 400 })
    }
}