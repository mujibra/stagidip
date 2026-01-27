import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { serverError, validationError } from "@/lib/http/errorResponse";
import { toJsonSafe } from "@/lib/serialize";

export const runtime = "nodejs";

function toBigIntFromParam(v: string): bigint | null {
    const n = Number(v);
    if (!Number.isFinite(n)) return null;
    return BigInt(n);
}

function mapTypeToRole(type: string): string {
    switch (type) {
        case "TSS":
            return "OPERATOR_TSS";
        case "STAGING":
            return "OPERATOR_DIP";
        default:
            return "OPERATOR_MOVER";
    }
}

export async function GET(_req: Request, ctx: { params: Promise<{ type: string; id_userLogin: string }> }) {
    try {
        const { type, id_userLogin } = await ctx.params;
        const id = toBigIntFromParam(id_userLogin);
        if (!id) return validationError({ id_userLogin: ["Invalid user id"] });

        const loginUser = await prisma.users.findUnique({ where: { id }, select: { roles: true } });
        const role = loginUser?.roles ?? "";

        const dataApproval: unknown[] = [];
        const operatorRole = mapTypeToRole(type);

        if (role === "OPERATOR_TSS" || role === "OPERATOR_DIP" || role === "OPERATOR_MOVER") {
            const u = await prisma.users.findFirst({ where: { roles: operatorRole, id } });
            if (!u) {
                return NextResponse.json({ success: true, totalDatas: 0, data: [] });
            }

            const safe = toJsonSafe(u) as Record<string, unknown>;
            delete safe.reset_code;
            delete safe.email_verified_at;
            delete safe.reset_code_expired_at;
            delete safe.created_at;
            delete safe.updated_at;

            dataApproval.push(safe);
        } else if (role === "SUPER_ADMIN" || role === "ADMIN" || role === "SUPERVISOR") {
            const users = await prisma.users.findMany({ where: { roles: operatorRole } });

            for (const u of users) {
                const safe = toJsonSafe(u) as Record<string, unknown>;
                delete safe.reset_code;
                delete safe.email_verified_at;
                delete safe.reset_code_expired_at;
                delete safe.created_at;
                delete safe.updated_at;
                dataApproval.push(safe);
            }
        }

        return NextResponse.json({
            success: true,
            totalDatas: dataApproval.length,
            data: dataApproval,
        });
    } catch (e) {
        return serverError(e);
    }
}
