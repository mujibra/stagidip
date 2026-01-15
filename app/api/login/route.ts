import "dotenv/config";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
    const contentType = req.headers.get("content-type") || "";

    let email = "";
    let password = "";

    // x-www-form-urlencoded
    if (contentType.includes("application/x-www-form-urlencoded")) {
        const formData = await req.formData();
        email = String(formData.get("email") || "");
        password = String(formData.get("password") || "");
    }

    // JSON
    else if (contentType.includes("application/json")) {
        const body = await req.json();
        email = body.email;
        password = body.password;
    }

    // Unsupported types
    else {
        return NextResponse.json({ error: "Unsupported content type" }, { status: 415 });
    }

    // Empty field validation
    if (!email || !password) {
        return NextResponse.json({ error: "Email dan password wajib diisi" }, { status: 400 });
    }

    // Lookup user by email
    const user = await prisma.users.findUnique({
        where: { email },
    });

    if (!user) {
        return NextResponse.json({ error: "Email atau password salah" }, { status: 401 });
    }

    // Compare bcrypt password
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
        return NextResponse.json({ error: "Email atau password salah" }, { status: 401 });
    }

    // Create JWT
    const token = jwt.sign(
        {
            id: Number(user.id),
            email: user.email,
            roles: user.roles,
        },
        process.env.JWT_SECRET!,
        { expiresIn: "1d" }
    );

    // Return success + set cookie
    const res = NextResponse.json({
        success: true,
        message: "Login berhasil",
        user: {
            id: Number(user.id),
            email: user.email,
            roles: user.roles,
            authToken: token,
        },
    });

    res.cookies.set("token", token, {
        httpOnly: true,
        path: "/",
    });

    return res;
}
