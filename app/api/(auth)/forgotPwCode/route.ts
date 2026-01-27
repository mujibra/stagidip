import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { parseBody } from "@/lib/parseBody";
import { serverError, validationError } from "@/lib/http/errorResponse";

export const runtime = "nodejs";

type Body = { email?: string; code?: string };

export async function POST(req: NextRequest) {
    try {
        const body = await parseBody<Body>(req);

        const errors: Record<string, string[]> = {};
        if (!body.email) errors.email = ["Email wajib diisi"];
        if (!body.code) errors.code = ["Code wajib diisi"];
        if (Object.keys(errors).length) return validationError(errors);

        const now = new Date();

        const user = await prisma.users.findFirst({
            where: {
                email: String(body.email),
                reset_code: String(body.code),
                reset_code_expired_at: { gte: now },
            },
        });

        if (!user) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

        return NextResponse.json({ message: "Reset code matches" });
    } catch (e) {
        return serverError(e);
    }
}
