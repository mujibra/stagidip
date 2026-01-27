import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
    const token = req.cookies.get("token")?.value;
    if (!token) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
        return NextResponse.json(
            { success: false, type: "SERVER_MISCONFIG", message: "JWT_SECRET is not set" },
            { status: 500 }
        );
    }

    try {
        const payload = jwt.verify(token, secret) as { userId?: number | string };
        const userId = payload?.userId ?? "user";
        return NextResponse.json({ message: `Hi ${userId}, welcome to home` });
    } catch {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
}
