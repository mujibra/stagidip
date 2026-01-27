import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { serverError, validationError } from "@/lib/http/errorResponse";
import { toJsonSafe } from "@/lib/serialize";

function toInt(v: unknown): number | null {
    if (v === null || v === undefined || v === "") return null;
    const n = Number(v);
    return Number.isFinite(n) ? n : null;
}

type ApprovalBody = {
    approval_by?: number;
};

// Mirrors Laravel TransaksiSpesifikasiMesinController@updateApprovalSpekMesin
export async function PUT(req: Request, ctx: { params: Promise<{ type: string; id: string }> }) {
    try {
        const { type, id } = await ctx.params;
        const idNum = toInt(id);
        if (!idNum) return validationError({ id: ["Invalid id"] });

        const body = (await req.json()) as ApprovalBody;
        const approvalBy = toInt(body.approval_by);
        if (!approvalBy) return validationError({ approval_by: ["approval_by is required"] });

        if (type === "STAGING") {
            const updated = await prisma.transaksi_spesifikasi_mesin.update({
                where: { id: idNum },
                data: { approval_staging: approvalBy },
            });

            return NextResponse.json({ success: true, message: "Update Approval Staging was successfully", data: toJsonSafe(updated) }, { status: 200 });
        }

        if (type === "TSS") {
            const updated = await prisma.transaksi_spesifikasi_mesin.update({
                where: { id: idNum },
                data: { approval_tss: approvalBy },
            });

            return NextResponse.json({ success: true, message: "Update Approval TSS was successfully", data: toJsonSafe(updated) }, { status: 200 });
        }

        return validationError({ type: ["type must be STAGING or TSS"] });
    } catch (e) {
        return serverError(e);
    }
}

// Mirrors Laravel TransaksiSpesifikasiMesinController@getApprovalSpekMesin
export async function GET(_req: Request, ctx: { params: Promise<{ type: string; id: string }> }) {
    try {
        const { type, id } = await ctx.params;
        const idNum = toInt(id);
        if (!idNum) return validationError({ id: ["Invalid id"] });

        const hdr = await prisma.transaksi_spesifikasi_mesin.findFirst({ where: { id: idNum } });
        if (!hdr) {
            return NextResponse.json({ success: false, data: null }, { status: 200 });
        }

        const userId = type === "STAGING" ? hdr.approval_staging : type === "TSS" ? hdr.approval_tss : null;

        if (!userId) {
            return NextResponse.json({ success: true, data: [] }, { status: 200 });
        }

        const user = await prisma.users.findFirst({
            where: { id: BigInt(userId) },
            select: {
                id: true,
                name: true,
                email: true,
                roles: true,
                id_customer: true,
                id_gudang: true,
                status: true,
            },
        });

        return NextResponse.json({ success: true, data: user ? toJsonSafe([user]) : [] }, { status: 200 });
    } catch (e) {
        return serverError(e);
    }
}
