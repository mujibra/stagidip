import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { prisma } from "@/lib/prisma";
import { parseBody } from "@/lib/parseBody";
import { serverError, validationError } from "@/lib/http/errorResponse";
import { toJsonSafe } from "@/lib/serialize";

export const runtime = "nodejs";

type RegisterDTO = {
    name?: string;
    email?: string;
    password?: string;
    roles?: string;
    id_customer?: number | string | null;
    id_gudang?: number | string | null;
    status?: number | string | null;
    user_login?: string; // Laravel: used to prevent ADMIN adding SUPER_ADMIN
};

function toInt(value: unknown): number | null {
    if (value === null || value === undefined || value === "") return null;
    const n = Number(value);
    return Number.isFinite(n) ? n : null;
}

export async function POST(req: NextRequest) {
    try {
        const body = await parseBody<RegisterDTO>(req);

        const errors: Record<string, string[]> = {};
        if (!body.name) errors.name = ["Name wajib diisi"];
        if (!body.email) errors.email = ["Email wajib diisi"];
        if (!body.password) errors.password = ["Password wajib diisi"];
        if (body.password && body.password.length < 8) errors.password = ["Password minimal 8 karakter"];

        if (Object.keys(errors).length) return validationError(errors);

        const email = String(body.email);
        const roles = body.roles ?? null;

        const emailExist = await prisma.users.findFirst({ where: { email } });
        if (emailExist) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Email yang anda masukkan sebelumnya sudah terdaftar. Harap pilih email lain",
                },
                { status: 400 },
            );
        }

        // Laravel: $check = $request->user_login == 'ADMIN' && $request->roles == 'SUPER_ADMIN';
        const userLoginRole = body.user_login ? String(body.user_login) : "";
        const cannotCreateSuperAdmin = userLoginRole === "ADMIN" && roles === "SUPER_ADMIN";
        if (cannotCreateSuperAdmin) {
            return NextResponse.json({ success: false, message: "Role Admin tidak Bisa Menambahkan Role Super Admin." }, { status: 400 });
        }

        const passwordHash = await bcrypt.hash(String(body.password), 10);

        const created = await prisma.users.create({
            data: {
                name: String(body.name),
                email,
                password: passwordHash,
                roles,
                id_customer: toInt(body.id_customer),
                id_gudang: toInt(body.id_gudang),
                status: toInt(body.status),
            },
        });

        // Laravel attaches extra object based on roles
        let extra: Record<string, unknown> = {};

        if (created.roles === "OPERATOR_MOVER" && created.id_gudang) {
            const gudang = await prisma.mst_gudang.findFirst({ where: { id: created.id_gudang } });
            extra = { gudang: gudang ? toJsonSafe(gudang) : null };
        } else if (created.roles === "GUEST_BANK" && created.id_customer) {
            const bankDetail = await prisma.mst_customer.findFirst({ where: { id: created.id_customer } });
            extra = { bank_detail: bankDetail ? toJsonSafe(bankDetail) : null };
        }

        return NextResponse.json({
            data: {
                ...toJsonSafe(created),
                ...extra,
                password: undefined,
            },
            access_token: null,
            token_type: "Bearer",
        });
    } catch (error) {
        return serverError(error);
    }
}
