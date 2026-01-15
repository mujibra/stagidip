import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

// Everything under /api is protected EXCEPT these.
const PUBLIC_ROUTES = ["/api/health", "/api/login"];

function json401(message: string) {
    return NextResponse.json({ success: false, type: "UNAUTHORIZED", message }, { status: 401 });
}

export function proxy(req: NextRequest) {
    const { pathname } = req.nextUrl;

    // Allow public routes
    if (PUBLIC_ROUTES.some((p) => pathname.startsWith(p))) {
        return NextResponse.next();
    }

    // Read token from Authorization header OR cookie
    const authHeader = req.headers.get("authorization") || "";
    const bearer = authHeader.startsWith("Bearer ") ? authHeader.slice(7).trim() : null;

    const cookieToken = req.cookies.get("token")?.value ?? null;

    const token = bearer ?? cookieToken;

    if (!token) return json401("Unauthorized");

    const secret = process.env.JWT_SECRET;
    if (!secret) {
        // Fail CLOSED if misconfigured (better than silently allowing access)
        return NextResponse.json({ success: false, type: "SERVER_MISCONFIG", message: "JWT_SECRET is not set" }, { status: 500 });
    }

    try {
        jwt.verify(token, secret);
        return NextResponse.next();
    } catch {
        return json401("Invalid token");
    }
}

export const config = {
    matcher: ["/api/:path*"],
};
