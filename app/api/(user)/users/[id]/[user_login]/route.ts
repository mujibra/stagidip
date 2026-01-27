import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { prisma } from "@/lib/prisma";
import { parseBody } from "@/lib/parseBody";
import { serverError, validationError } from "@/lib/http/errorResponse";
import { toJsonSafe } from "@/lib/serialize";

export const runtime = "nodejs";

type UpdateUserBody = {
    name?: string;
    email?: string;
    password?: string;
    roles?: string;
    id_customer?: number | string | null;
    id_gudang?: number | string | null;
    status?: number | string | null;
};

function toBigInt(value: string): bigint | null {
    if (!value) return null;
    const num = Number(value);
    return Number.isFinite(num) ? BigInt(num) : null;
}

function toInt(value: unknown): number | null {
    if (value === null || value === undefined || value === "") return null;
    const num = Number(value);
    return Number.isFinite(num) ? num : null;
}

export async function PUT(req: NextRequest, ctx: { params: { id: string; user_login: string } }) {
    try {
        const id = toBigInt(ctx.params.id);
        const userLoginId = toBigInt(ctx.params.user_login);

        if (!id || !userLoginId) {
            return validationError({ id: ["Invalid user id"] });
        }

        const [loginUser, targetUser] = await Promise.all([
            prisma.users.findUnique({ where: { id: userLoginId }, select: { roles: true } }),
            prisma.users.findUnique({ where: { id }, select: { id: true, name: true, roles: true } }),
        ]);

        if (!targetUser) {
            return NextResponse.json({ success: false, message: "User tidak ditemukan" }, { status: 404 });
        }

        const body = await parseBody<UpdateUserBody>(req);

        if (!body.roles) {
            return validationError({ roles: ["Roles wajib dipilih"] });
        }

        const status = body.status !== undefined ? toInt(body.status) : null;
        const cannotInactive = loginUser?.roles === "ADMIN" && status === 0 && targetUser.roles === "SUPER_ADMIN";

        if (cannotInactive) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Role Admin tidak Bisa melakukan Inactive Role Super Admin.",
                },
                { status: 400 }
            );
        }

        const updateData: Record<string, unknown> = {
            name: body.name,
            email: body.email,
            roles: body.roles,
            status,
            id_customer: toInt(body.id_customer),
            id_gudang: toInt(body.id_gudang),
        };

        if (body.password) {
            updateData.password = await bcrypt.hash(body.password, 10);
        }

        Object.keys(updateData).forEach((key) => updateData[key] === undefined && delete updateData[key]);

        await prisma.users.update({
            where: { id },
            data: updateData,
        });

        return NextResponse.json({
            success: true,
            message: `Data User ${targetUser.name} berhasil diupdate`,
            data: toJsonSafe(targetUser),
        });
    } catch (error) {
        return serverError(error);
    }
}

export async function DELETE(_req: NextRequest, ctx: { params: { id: string; user_login: string } }) {
    try {
        const id = toBigInt(ctx.params.id);
        const userLoginId = toBigInt(ctx.params.user_login);

        if (!id || !userLoginId) {
            return validationError({ id: ["Invalid user id"] });
        }

        const [loginUser, targetUser] = await Promise.all([
            prisma.users.findUnique({ where: { id: userLoginId }, select: { roles: true } }),
            prisma.users.findUnique({ where: { id }, select: { id: true, name: true, roles: true } }),
        ]);

        if (!targetUser) {
            return NextResponse.json({ success: false, message: "User tidak ditemukan" }, { status: 404 });
        }

        const cannotDelete = loginUser?.roles === "ADMIN" && targetUser.roles === "SUPER_ADMIN";
        if (cannotDelete) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Role Admin tidak Bisa Menghapus Role Super Admin.",
                },
                { status: 400 }
            );
        }

        const deleted = await prisma.users.delete({ where: { id } });

        return NextResponse.json({
            success: true,
            message: `User ${targetUser.name} berhasil dihapus`,
            data: toJsonSafe(deleted),
        });
    } catch (error) {
        return serverError(error);
    }
}
