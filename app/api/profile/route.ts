import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

import { prisma } from "@/lib/prisma";
import { toJsonSafe } from "@/lib/serialize";

export const runtime = "nodejs";

type TokenPayload = {
    userId?: string | number;
    email?: string;
};

export async function GET(req: NextRequest) {
    const token = req.cookies.get("token")?.value;
    if (!token) {
        return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
        return NextResponse.json(
            { success: false, type: "SERVER_MISCONFIG", message: "JWT_SECRET is not set" },
            { status: 500 },
        );
    }

    try {
        const payload = jwt.verify(token, secret) as TokenPayload;
        const userIdRaw = payload.userId;
        if (!userIdRaw) {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }

        const user = await prisma.users.findUnique({
            where: { id: BigInt(userIdRaw) },
        });

        if (!user) {
            return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            data: {
                ...toJsonSafe(user),
                password: undefined,
                remember_token: undefined,
                reset_code: undefined,
            },
        });
    } catch {
        return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }
}
