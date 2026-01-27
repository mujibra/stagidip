import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { parseBody } from "@/lib/parseBody";
import { serverError, validationError } from "@/lib/http/errorResponse";
import { toJsonSafe } from "@/lib/serialize";

export const runtime = "nodejs";

type StoreRow = {
    id_spek_mesin_hdr: number;
    id_parent: number;
    item_parent: string;
    fill_description: unknown; // array or null
    results?: string | null;
};

type StorePayload = Array<{
    time_todo?: string | null;
    dataArray?: StoreRow[];
}>;

function normalizeFillDescription(v: unknown): string | null {
    if (!Array.isArray(v)) return null;

    if (v.length === 1) {
        const only = v[0];
        if (only === null || only === undefined) return null;

        const n = typeof only === "number" ? only : Number(only);
        if (!Number.isFinite(n)) return null;

        return String(n);
    }

    const arrNums: number[] = [];
    for (const x of v) {
        if (x === null || x === undefined) continue;
        const n = typeof x === "number" ? x : Number(x);
        if (Number.isFinite(n)) arrNums.push(n);
    }

    if (arrNums.length === 0) return null;
    return JSON.stringify(arrNums);
}

// Mirrors store(Request $request)
export async function POST(req: NextRequest) {
    try {
        const payload = await parseBody<StorePayload>(req);

        if (!Array.isArray(payload) || payload.length === 0) {
            return validationError({ body: ["Payload must be an array with at least 1 element"] });
        }

        const first = payload[0];
        const timing = first.time_todo ?? null;
        const dataArray = first.dataArray ?? [];

        if (!Array.isArray(dataArray) || dataArray.length === 0) {
            return NextResponse.json({ success: false, message: "Transaksi Spesifikasi Mesin Detail Error Inserted." }, { status: 400 });
        }

        const headerId = dataArray[0]?.id_spek_mesin_hdr;
        if (!headerId) return validationError({ id_spek_mesin_hdr: ["id_spek_mesin_hdr is required"] });

        const headerExists = await prisma.transaksi_spesifikasi_mesin.findFirst({
            where: { id: headerId },
            select: { id: true },
        });

        if (!headerExists) {
            return NextResponse.json({ success: false, message: "Header not found" }, { status: 400 });
        }

        const inserted = [];

        for (const row of dataArray) {
            const fill = normalizeFillDescription(row.fill_description);

            const created = await prisma.transaksi_spesifikasi_mesin_dtl_new.create({
                data: {
                    id_spek_mesin_hdr: row.id_spek_mesin_hdr,
                    id_parent: row.id_parent,
                    item_parent: row.item_parent,
                    fill_description: fill,
                    results: row.results ?? null,
                },
            });

            inserted.push(created);
        }

        await prisma.transaksi_spesifikasi_mesin.update({
            where: { id: headerId },
            data: { time_todo: timing },
        });

        return NextResponse.json(
            {
                success: true,
                message: "Transaksi Spesifikasi Mesin Detail created successfully.",
                data: toJsonSafe(inserted),
            },
            { status: 200 },
        );
    } catch (e) {
        return serverError(e);
    }
}
