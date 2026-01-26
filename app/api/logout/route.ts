import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(_req: NextRequest) {
    const res = NextResponse.json({
        message: "You have successfully logged out and the token was successfully deleted",
    });

    res.cookies.set("token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 0,
    });

    return res;
}
