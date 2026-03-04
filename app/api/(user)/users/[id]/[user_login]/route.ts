import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { prisma } from "@/lib/prisma";
import { parseBody } from "@/lib/parseBody";
import { serverError, validationError } from "@/lib/http/errorResponse";
import { toJsonSafe } from "@/lib/serialize";
import { isPrismaNotFoundError } from "@/lib/http/validation";
import {
    hasAnyErrors,
    toBigIntId,
    toNullableInt,
    UpdateUserBody,
    validateUpdateUserPayload,
    validateUserRouteParams,
} from "@/lib/http/userValidation";

export const runtime = "nodejs";

export async function PUT(req: NextRequest, ctx: { params: Promise<{ id: string; user_login: string }> }) {
    try {
        const params = await ctx.params;
        const paramErrors = validateUserRouteParams(params.id, params.user_login);

        if (hasAnyErrors(paramErrors)) {
            return validationError(paramErrors);
        }

        const id = toBigIntId(params.id)!;
        const userLoginId = toBigIntId(params.user_login)!;

        const [loginUser, targetUser] = await Promise.all([
            prisma.users.findUnique({ where: { id: userLoginId }, select: { roles: true } }),
            prisma.users.findUnique({ where: { id }, select: { id: true, name: true, roles: true } }),
        ]);

        if (!targetUser) {
            return NextResponse.json({ success: false, type: "NOT_FOUND", message: "User tidak ditemukan" }, { status: 404 });
        }

        const body = await parseBody<UpdateUserBody>(req);
        const payloadErrors = validateUpdateUserPayload(body);
        if (hasAnyErrors(payloadErrors)) {
            return validationError(payloadErrors);
        }

        const status = body.status !== undefined ? toNullableInt(body.status) : null;
        const cannotInactive = loginUser?.roles === "ADMIN" && status === 0 && targetUser.roles === "SUPER_ADMIN";

        if (cannotInactive) {
            return validationError({
                roles: ["Role Admin tidak Bisa melakukan Inactive Role Super Admin."],
            });
        }

        const updateData: Record<string, unknown> = {
            name: body.name,
            email: body.email,
            roles: body.roles,
            status,
            id_customer: toNullableInt(body.id_customer),
            id_gudang: toNullableInt(body.id_gudang),
        };

        if (body.password) {
            updateData.password = await bcrypt.hash(body.password, 10);
        }

        Object.keys(updateData).forEach((key) => updateData[key] === undefined && delete updateData[key]);

        const updated = await prisma.users.update({
            where: { id },
            data: updateData,
        });

        return NextResponse.json({
            success: true,
            message: `Data User ${targetUser.name} berhasil diupdate`,
            data: toJsonSafe(updated),
        });
    } catch (error) {
        if (isPrismaNotFoundError(error)) {
            return NextResponse.json({ success: false, type: "NOT_FOUND", message: "User tidak ditemukan" }, { status: 404 });
        }
        return serverError(error);
    }
}

export async function DELETE(_req: NextRequest, ctx: { params: Promise<{ id: string; user_login: string }> }) {
    try {
        const params = await ctx.params;
        const paramErrors = validateUserRouteParams(params.id, params.user_login);

        if (hasAnyErrors(paramErrors)) {
            return validationError(paramErrors);
        }

        const id = toBigIntId(params.id)!;
        const userLoginId = toBigIntId(params.user_login)!;

        const [loginUser, targetUser] = await Promise.all([
            prisma.users.findUnique({ where: { id: userLoginId }, select: { roles: true } }),
            prisma.users.findUnique({ where: { id }, select: { id: true, name: true, roles: true } }),
        ]);

        if (!targetUser) {
            return NextResponse.json({ success: false, type: "NOT_FOUND", message: "User tidak ditemukan" }, { status: 404 });
        }

        const cannotDelete = loginUser?.roles === "ADMIN" && targetUser.roles === "SUPER_ADMIN";
        if (cannotDelete) {
            return validationError({
                roles: ["Role Admin tidak Bisa Menghapus Role Super Admin."],
            });
        }

        const deleted = await prisma.users.delete({ where: { id } });

        return NextResponse.json({
            success: true,
            message: `User ${targetUser.name} berhasil dihapus`,
            data: toJsonSafe(deleted),
        });
    } catch (error) {
        if (isPrismaNotFoundError(error)) {
            return NextResponse.json({ success: false, type: "NOT_FOUND", message: "User tidak ditemukan" }, { status: 404 });
        }
        return serverError(error);
    }
}
