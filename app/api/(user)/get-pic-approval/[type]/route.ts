import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { serverError } from "@/lib/http/errorResponse";
import { toJsonSafe } from "@/lib/serialize";

export const runtime = "nodejs";

const roleByType: Record<string, string> = {
    DIP: "OPERATOR_DIP",
    TSS: "OPERATOR_TSS",
    MOVER: "OPERATOR_MOVER",
};

export async function GET(_req: Request, ctx: { params: { type: string } }) {
    try {
        const type = ctx.params.type.toUpperCase();
        const role = roleByType[type];

        if (!role) {
            return NextResponse.json({ success: true, totalDatas: 0, data: [] });
        }

        const users = await prisma.users.findMany({
            where: { roles: role },
        });

        return NextResponse.json({
            success: true,
            totalDatas: users.length,
            data: toJsonSafe(users),
        });
    } catch (error) {
        return serverError(error);
    }
}
