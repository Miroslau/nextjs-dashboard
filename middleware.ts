import {NextRequest, NextResponse} from "next/server";

export function middleware(request: NextRequest) {
    const token = request.cookies.get("authjs.session-token");
    console.log("token: ", token)
    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*", "/profile/:path*", "/auth/:path*"],
};