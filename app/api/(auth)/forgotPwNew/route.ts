import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { prisma } from "@/lib/prisma";
import { parseBody } from "@/lib/parseBody";
import { serverError, validationError } from "@/lib/http/errorResponse";

export const runtime = "nodejs";

type Body = { email?: string; code?: string; password?: string };

export async function POST(req: NextRequest) {
    try {
        const body = await parseBody<Body>(req);

        const errors: Record<string, string[]> = {};
        if (!body.email) errors.email = ["Email wajib diisi"];
        if (!body.password) errors.password = ["Password wajib diisi"];
        if (body.password && body.password.length < 8) errors.password = ["Password minimal 8 karakter"];
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

        const passwordHash = await bcrypt.hash(String(body.password), 10);

        await prisma.users.update({
            where: { id: user.id },
            data: {
                reset_code: null,
                reset_code_expired_at: null,
                password: passwordHash,
            },
        });

        return NextResponse.json({ message: "The password has been successfully changed. Please log in again." });
    } catch (e) {
        return serverError(e);
    }
}
