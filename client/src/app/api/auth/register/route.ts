import { register } from "@/lib/actions";
import { NextResponse } from "next/server";

export async function POST(request: Request, response: Response) {

    try {
        const {email, password} = await request.json();
        await register(email, password);
        return NextResponse.json({email, password});
    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 500});       
    }
}