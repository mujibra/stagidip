import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { serverError, validationError } from "@/lib/http/errorResponse";
import { toJsonSafe } from "@/lib/serialize";

function toInt(v: unknown): number | null {
    if (v === null || v === undefined || v === "") return null;
    const n = Number(v);
    return Number.isFinite(n) ? n : null;
}

// Mirrors Laravel DeliveryRequestController@getListApprovalBy
export async function GET(_req: Request, ctx: { params: Promise<{ user_login: string }> }) {
    try {
        const { user_login } = await ctx.params;
        const userIdNum = toInt(user_login);
        if (!userIdNum) return validationError({ user_login: ["Invalid user id"] });

        const user = await prisma.users.findFirst({ where: { id: BigInt(userIdNum) } });
        if (!user) {
            return NextResponse.json({ success: false, message: `User with id ${user_login} Not Found`, data: [] });
        }

        const role = user.roles ?? "";
        if (role === "SUPER_ADMIN" || role === "ADMIN") {
            const users = await prisma.users.findMany({
                where: { roles: { in: ["SUPERVISOR", "SUPER_ADMIN", "ADMIN"] } },
            });
            return NextResponse.json({ success: true, totalDatas: users.length, data: toJsonSafe(users) });
        }

        if (role === "SUPERVISOR") {
            const users = await prisma.users.findMany({ where: { roles: "SUPERVISOR", id: BigInt(userIdNum) } });
            return NextResponse.json({ success: true, data: toJsonSafe(users) });
        }

        return NextResponse.json({ success: false, message: `User with id ${user_login} Not Found`, data: [] });
    } catch (e) {
        return serverError(e);
    }
}
