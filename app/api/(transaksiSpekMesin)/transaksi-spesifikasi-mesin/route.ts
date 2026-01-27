import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { serverError, validationError } from "@/lib/http/errorResponse";
import { toJsonSafe } from "@/lib/serialize";

type StoreBody = {
    id_po?: number | null;
    sn_mesins?: unknown; // array/string accepted, we normalize
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

// Mirrors Laravel TransaksiSpesifikasiMesinController@store
export async function POST(req: Request) {
    try {
        const body = (await req.json()) as StoreBody;

        const id_po = body.id_po ?? null;
        if (!id_po) return validationError({ id_po: ["id_po is required"] });

        const exists = await prisma.transaksi_spesifikasi_mesin.findFirst({
            where: { id_po },
            select: { id: true },
        });

        if (exists) {
            const po = await prisma.tbl_po.findFirst({
                where: { id: id_po },
                select: { no_po: true },
            });

            const noPo = po?.no_po ?? "";
            return NextResponse.json(
                {
                    success: false,
                    message: `Insert Data Spesification Error, No.PO ${noPo} was Exists.`,
                },
                { status: 400 },
            );
        }

        const inserted = await prisma.transaksi_spesifikasi_mesin.create({
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
            message: "Transaction of Machine Spesification created successfully.",
            data: toJsonSafe(inserted),
        });
    } catch (e) {
        return serverError(e);
    }
}
