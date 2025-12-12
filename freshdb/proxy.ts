import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function proxy(req: NextRequest){
    const token = req.cookies.get("token")?.value;

    if(!token){
        console.log("No token found → redirecting to /login");
        return NextResponse.redirect(new URL("/login", req.url));
    }

    try{
        jwt.verify(token, process.env.JWT_SECRET as string);
        return NextResponse.next();
    } catch(err){
        return NextResponse.redirect(new URL("/exclusive", req.url));
    }
}

export const config = {
    matcher: [
        "/exclusive/:path*",
        "/login",
    ]
}