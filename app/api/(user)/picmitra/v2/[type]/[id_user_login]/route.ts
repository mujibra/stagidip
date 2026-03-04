import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { serverError, validationError } from "@/lib/http/errorResponse";
import { hasValidationErrors, toNumber } from "@/lib/http/validation";
import { toJsonSafe } from "@/lib/serialize";
import { resolvePicMitraRole, validateUserLoginParam } from "@/lib/http/userQueryValidation";

export const runtime = "nodejs";

type UserResponse = Awaited<ReturnType<typeof prisma.users.findFirst>>;

function sanitizeUser(user: UserResponse) {
    if (!user) return user;

    const sanitized = { ...user } as Record<string, unknown>;
    delete sanitized.reset_code;
    delete sanitized.email_verified_at;
    delete sanitized.reset_code_expired_at;
    delete sanitized.created_at;
    delete sanitized.updated_at;
    return sanitized;
}

export async function GET(_req: Request, ctx: { params: Promise<{ type: string; id_user_login: string }> }) {
    try {
        const params = await ctx.params;
        const roleResolved = resolvePicMitraRole(params.type);
        const loginErrors = validateUserLoginParam(params.id_user_login);

        if (hasValidationErrors(roleResolved.errors) || hasValidationErrors(loginErrors)) {
            return validationError({ ...roleResolved.errors, ...loginErrors });
        }

        const idUserLogin = toNumber(params.id_user_login)!;
        const loginUser = await prisma.users.findUnique({ where: { id: BigInt(idUserLogin) }, select: { roles: true } });

        if (!loginUser?.roles) {
            return NextResponse.json({ success: true, totalDatas: 0, data: [] });
        }

        const targetRole = roleResolved.role!;
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
