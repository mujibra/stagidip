import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { parseBody } from "@/lib/parseBody";
import { validationError, serverError } from "@/lib/http/errorResponse";
export const runtime = "nodejs";

type LoginDTO = {
    email?: string;
    password?: string;
};

export async function POST(req: NextRequest) {
    try {
        const body = await parseBody<LoginDTO>(req);

        const errors: Record<string, string[]> = {};
        if (!body.email) errors.email = ["Username wajib diisi"];
        if (!body.password) errors.password = ["Password wajib diisi"];

        if (Object.keys(errors).length) return validationError(errors);

        const secret = process.env.JWT_SECRET;
        if (!secret) {
            return NextResponse.json({ success: false, type: "SERVER_MISCONFIG", message: "JWT_SECRET is not set" }, { status: 500 });
        }

        // Adjust model/field names to your schema if needed
        const user = await prisma.user.findFirst({
            where: { email: body.email },
        });

        if (!user) {
            return NextResponse.json({ success: false, message: "Username atau password salah" }, { status: 401 });
        }

        // Adjust password field name: common ones are `password`, `password_hash`
        const passwordHash = user.password;

        const ok = passwordHash ? await bcrypt.compare(body.password!, passwordHash) : false;
        if (!ok) {
            return NextResponse.json({ success: false, message: "Username atau password salah" }, { status: 401 });
        }

        // Keep payload minimal
        const token = jwt.sign(
            {
                userId: user.id,
                email: user.email,
            },
            secret,
            { expiresIn: "7d" }
        );

        const res = NextResponse.json({
            success: true,
            message: "Login berhasil",
            data: {
                // Return user data WITHOUT password hash
                ...user,
                password: undefined,
                password_hash: undefined,
                token: undefined, // don't echo token into data
                id: String(user.id),
            },
        });

        // Cookie settings
        res.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 60 * 24 * 7, // 7 days
        });

        return res;
    } catch (error) {
        return serverError(error);
    }
}
