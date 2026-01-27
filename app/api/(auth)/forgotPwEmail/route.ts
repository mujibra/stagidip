import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { parseBody } from "@/lib/parseBody";
import { serverError, validationError } from "@/lib/http/errorResponse";

export const runtime = "nodejs";

type Body = { email?: string };

function addMinutes(d: Date, minutes: number) {
    return new Date(d.getTime() + minutes * 60_000);
}

function otp4(): string {
    const n = Math.floor(1000 + Math.random() * 9000);
    return String(n);
}

export async function POST(req: NextRequest) {
    try {
        const body = await parseBody<Body>(req);
        if (!body.email) return validationError({ email: ["Email wajib diisi"] });

        const user = await prisma.users.findFirst({ where: { email: String(body.email) } });
        if (!user) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const code = otp4();
        const expiredAt = addMinutes(new Date(), 30);

        await prisma.users.update({
            where: { id: user.id },
            data: {
                reset_code: code,
                reset_code_expired_at: expiredAt,
            },
        });

        // Laravel dispatches a job to email. Here we just return success.
        // If you want real email sending: wire nodemailer/resend and send code here.
        return NextResponse.json({ message: "The reset code has been successfully sent by email" });
    } catch (e) {
        return serverError(e);
    }
}
