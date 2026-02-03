import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { serverError } from "@/lib/http/errorResponse";
import { toJsonSafe } from "@/lib/serialize";

export const runtime = "nodejs";

const roleByType: Record<string, string> = {
    TSS: "OPERATOR_TSS",
    STAGING: "OPERATOR_DIP",
    MOVER: "OPERATOR_MOVER",
};

type UserResponse = Awaited<ReturnType<typeof prisma.users.findFirst>>;

function sanitizeUser(user: UserResponse) {
    if (!user) return user;

    const { reset_code, email_verified_at, reset_code_expired_at, created_at, updated_at, ...rest } = user;
    return rest;
}

export async function GET(_req: Request, ctx: { params: Promise<{ type: string; id_user_login: string }> }) {
    try {
        const type = (await ctx.params).type.toUpperCase();
        const idUserLogin = Number((await ctx.params).id_user_login);
        if (!Number.isFinite(idUserLogin)) {
            return NextResponse.json({ success: false, message: "Invalid user login" }, { status: 400 });
        }

        const loginUser = await prisma.users.findUnique({ where: { id: BigInt(idUserLogin) }, select: { roles: true } });

        if (!loginUser?.roles) {
            return NextResponse.json({ success: true, totalDatas: 0, data: [] });
        }

        const targetRole = roleByType[type] ?? "OPERATOR_MOVER";
        const isOperator = ["OPERATOR_TSS", "OPERATOR_DIP", "OPERATOR_MOVER"].includes(loginUser.roles);
        const isAdmin = ["SUPER_ADMIN", "ADMIN", "SUPERVISOR"].includes(loginUser.roles);

        let data: UserResponse[] = [];

        if (isOperator) {
            const user = await prisma.users.findFirst({
                where: {
                    roles: targetRole,
                    id: BigInt(idUserLogin),
                },
            });
            if (user) data = [user];
        } else if (isAdmin) {
            data = await prisma.users.findMany({
                where: { roles: targetRole },
            });
        }

        const sanitized = data.map((user) => sanitizeUser(user));

        return NextResponse.json({
            success: true,
            totalDatas: sanitized.length,
            data: toJsonSafe(sanitized),
        });
    } catch (error) {
        return serverError(error);
    }
}
