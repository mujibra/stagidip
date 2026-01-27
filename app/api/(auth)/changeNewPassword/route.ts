import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { prisma } from "@/lib/prisma";
import { parseBody } from "@/lib/parseBody";
import { serverError, validationError } from "@/lib/http/errorResponse";

export const runtime = "nodejs";

type Body = { email?: string; password?: string };

export async function POST(req: NextRequest) {
    try {
        const body = await parseBody<Body>(req);

        const errors: Record<string, string[]> = {};
        if (!body.email) errors.email = ["email wajib diisi"];
        if (!body.password) errors.password = ["password wajib diisi"];
        if (body.password && body.password.length < 8) errors.password = ["Password minimal 8 karakter"];
        if (Object.keys(errors).length) return validationError(errors);

        const email = String(body.email);

        const user = await prisma.users.findFirst({ where: { email } });
        if (!user) {
            return NextResponse.json({ success: false, message: "User not found." }, { status: 404 });
        }

        const passwordHash = await bcrypt.hash(String(body.password), 10);

        await prisma.users.update({
            where: { id: user.id },
            data: { password: passwordHash },
        });

        return NextResponse.json({ success: true, message: "Password updated successfully." }, { status: 200 });
    } catch (e) {
        return serverError(e);
    }
}
