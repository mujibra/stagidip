import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

import { parseBody } from "@/lib/parseBody";
import { serverError, validationError } from "@/lib/http/errorResponse";

export const runtime = "nodejs";

type Body = { kode?: string; token?: string };

function verifyToken(code: string, token: string): boolean {
    const secret = process.env.EMAIL_TOKEN_SECRET;
    if (!secret) return false;

    const parts = token.split(".");
    if (parts.length !== 2) return false;

    const [rawCode, sig] = parts;
    if (rawCode !== code) return false;

    const expected = crypto.createHmac("sha256", secret).update(rawCode).digest("hex");
    return crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected));
}

export async function POST(req: NextRequest) {
    try {
        const body = await parseBody<Body>(req);

        const errors: Record<string, string[]> = {};
        if (!body.kode) errors.kode = ["kode wajib diisi"];
        if (!body.token) errors.token = ["token wajib diisi"];
        if (Object.keys(errors).length) return validationError(errors);

        const ok = verifyToken(String(body.kode), String(body.token));
        if (ok) {
            return NextResponse.json({ success: true, message: "Code successfully." }, { status: 200 });
        }
        return NextResponse.json({ success: false, message: "Code unsuccessfully." }, { status: 400 });
    } catch (e) {
        return serverError(e);
    }
}
