import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function proxy(req: NextRequest){
    const token = req.cookies.get("token")?.value;
    const url = req.nextUrl.pathname;

    let isValid = false;
    if(token){
        try{
            jwt.verify(token, process.env.JWT_SECRET as string);
            isValid = true;
            } catch{}
        }

    if (url === "/login" && isValid){
        return NextResponse.redirect(new URL("/exclusive", req.url));
    }

    if (url === "/exclusive" && !isValid){
        return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/exclusive/:path*",
        "/login",
    ]
}