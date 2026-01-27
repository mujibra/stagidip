import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { serverError, validationError } from "@/lib/http/errorResponse";
import { toJsonSafe } from "@/lib/serialize";

type UpdateBody = {
    id_po?: number | null;
    sn_mesins?: unknown;
    id_type_mesin?: number;
    model?: number;
    pn_system?: string | null;
    customer?: number;
    notes?: string | null;
    approval_staging?: number | null;
    approval_tss?: number | null;
    time_todo?: string | null;
};

function toInt(v: unknown): number | null {
    if (v === null || v === undefined || v === "") return null;
    const n = Number(v);
    return Number.isFinite(n) ? n : null;
}

function normalizeSnMesins(v: unknown): string | null {
    if (v === null || v === undefined) return null;
    if (typeof v === "string") return v;
    try {
        return JSON.stringify(v);
    } catch {
        return null;
    }
}

// Mirrors Laravel TransaksiSpesifikasiMesinController@update
export async function PUT(req: Request, ctx: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await ctx.params;
        const idNum = toInt(id);
        if (!idNum) return validationError({ id: ["Invalid id"] });

        const body = (await req.json()) as UpdateBody;
        const id_po = body.id_po ?? null;
        if (!id_po) return validationError({ id_po: ["id_po is required"] });

        const updated = await prisma.transaksi_spesifikasi_mesin.update({
            where: { id: idNum },
            data: {
                id_po,
                sn_mesins: normalizeSnMesins(body.sn_mesins),
                id_type_mesin: toInt(body.id_type_mesin) ?? 0,
                model: toInt(body.model) ?? 0,
                pn_system: body.pn_system ?? null,
                customer: toInt(body.customer) ?? 0,
                notes: body.notes ?? null,
                approval_staging: toInt(body.approval_staging),
                approval_tss: toInt(body.approval_tss),
                time_todo: body.time_todo ?? null,
            },
        });

        return NextResponse.json({
            success: true,
            message: "Transaction of Machine Spesification updated successfully.",
            data: toJsonSafe(updated),
        });
    } catch (e) {
        return serverError(e);
    }
}

// Mirrors Laravel TransaksiSpesifikasiMesinController@destroy
export async function DELETE(_req: Request, ctx: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await ctx.params;
        const idNum = toInt(id);
        if (!idNum) return validationError({ id: ["Invalid id"] });

        const deleted = await prisma.transaksi_spesifikasi_mesin.delete({
            where: { id: idNum },
        });

        await prisma.transaksi_spesifikasi_mesin_dtl.deleteMany({
            where: { id_spek_mesin_hdr: idNum },
        });

        return NextResponse.json({
            success: true,
            message: "Delete Spesifikasi Mesin Berhasil",
            data: toJsonSafe(deleted),
        });
    } catch (e) {
        return serverError(e);
    }
}
