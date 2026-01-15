/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function proxy(req: NextRequest) {
    const protectedRoutes = ["/api/brand", "/api/master-customer", "/api/master-gudang", "/api/master-model", "/api/bacth"];

    const { pathname } = req.nextUrl;

    console.log("[proxy] TRIGGER:", req.nextUrl.pathname);

    // Not protected? Skip auth.
    if (!protectedRoutes.some((p) => pathname.startsWith(p))) {
        return NextResponse.next();
    }

    let token = "";

    const authHeader = req.headers.get("authorization") || "";

    if (!authHeader) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (authHeader.startsWith("Bearer ")) {
        token = authHeader.replace("Bearer ", "").trim();
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!);
        return NextResponse.next();
    } catch (error) {
        return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }
}

export const config = {
    matcher: ["/api/:path*"],
};
