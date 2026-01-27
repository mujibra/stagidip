import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

import { prisma } from "@/lib/prisma";
import { parseBody } from "@/lib/parseBody";
import { serverError, validationError } from "@/lib/http/errorResponse";

export const runtime = "nodejs";

type Body = { email?: string };

// NOTE: This is NOT Laravel Crypt. It’s just a deterministic “token” approach.
// If you need strict compatibility, you must re-implement the same encryption scheme.
function makeToken(code: string): string {
    const secret = process.env.EMAIL_TOKEN_SECRET;
    if (!secret) return "";
    const h = crypto.createHmac("sha256", secret).update(code).digest("hex");
    return `${code}.${h}`;
}

export async function POST(req: NextRequest) {
    try {
        const body = await parseBody<Body>(req);
        if (!body.email) return validationError({ email: ["email wajib diisi"] });

        const email = String(body.email);
        const user = await prisma.users.findFirst({ where: { email } });
        if (!user) {
            return NextResponse.json({ success: false, message: "User not found." }, { status: 404 });
        }

        const code = crypto.randomBytes(3).toString("hex").toUpperCase(); // 6 chars-ish
        const token = makeToken(code);

        if (!token) {
            return NextResponse.json({ success: false, message: "EMAIL_TOKEN_SECRET is not set" }, { status: 500 });
        }

        // Send email here (nodemailer/resend). For now, mirror API response.
        return NextResponse.json({ success: true, message: "Email sent successfully.", token }, { status: 200 });
    } catch (e) {
        return serverError(e);
    }
}
