import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { serverError, validationError } from "@/lib/http/errorResponse";
import { hasValidationErrors } from "@/lib/http/validation";
import { toJsonSafe } from "@/lib/serialize";
import { resolvePicApprovalRole } from "@/lib/http/userQueryValidation";

export const runtime = "nodejs";

export async function GET(_req: Request, ctx: { params: Promise<{ type: string }> }) {
    try {
        const { type } = await ctx.params;
        const resolved = resolvePicApprovalRole(type);

        if (hasValidationErrors(resolved.errors)) {
            return validationError(resolved.errors);
        }

        const users = await prisma.users.findMany({
            where: { roles: resolved.role! },
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
