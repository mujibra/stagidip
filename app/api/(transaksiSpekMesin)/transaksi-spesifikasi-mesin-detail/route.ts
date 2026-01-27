import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { parseBody } from "@/lib/parseBody";
import { serverError, validationError } from "@/lib/http/errorResponse";
import { toJsonSafe } from "@/lib/serialize";

export const runtime = "nodejs";

const MULTI_FILL_ITEMS = new Set<string>([
    "MEMORY",
    "MONITOR",
    "HDD",
    "CARDBIN",
    "CASSETTE",
    "REJECT",
    "KUNCI FASCIA ATAS",
    "KUNCI CASSETTE/REJECT",
    "LAN CARD",
    "KABEL HDMI TO DVI",
    "CUSTOMER DISPLAY",
    "CUSTOMER INPUT",
]);

const MULTI_FILL_ITEMS_UPDATE = new Set<string>(["MEMORY", "MONITOR", "HDD", "CARDBIN", "CASSETTE", "REJECT", "KUNCI FASCIA ATAS", "KUNCI CASSETTE/REJECT", "LAN CARD", "KABEL HDMI TO DVI"]);

type DetailRow = {
    id_spek_mesin_hdr: number;
    item_desc: string;
    fill_description: unknown; // can be number or array
    results?: string | null;
};

type StorePayload = Array<{
    time_todo?: string | null;
    dataArray?: DetailRow[];
}>;

function normalizeFillDescription(itemDesc: string, fill: unknown): string | null {
    if (fill === null || fill === undefined) return null;

    // In Laravel: for these item_desc, fill_description is JSON-encoded (array)
    if (MULTI_FILL_ITEMS.has(itemDesc)) {
        try {
            return JSON.stringify(fill);
        } catch {
            return null;
        }
    }

    // Otherwise it's a single id (stored as string)
    const n = typeof fill === "number" ? fill : Number(fill);
    if (!Number.isFinite(n)) return null;
    return String(n);
}

// Mirrors TransaksiSpesifikasiMesinDetailController@store
export async function POST(req: NextRequest) {
    try {
        const payload = await parseBody<StorePayload>(req);

        const first = payload?.[0];
        const timing = first?.time_todo ?? null;
        const dataArray = first?.dataArray ?? [];

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
            const fill_description = normalizeFillDescription(row.item_desc, row.fill_description);

            const created = await prisma.transaksi_spesifikasi_mesin_dtl.create({
                data: {
                    id_spek_mesin_hdr: row.id_spek_mesin_hdr,
                    item_desc: row.item_desc,
                    fill_description,
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

// Mirrors TransaksiSpesifikasiMesinDetailController@update
export async function PUT(req: NextRequest) {
    try {
        const rows = await parseBody<DetailRow[]>(req);

        if (!Array.isArray(rows) || rows.length === 0) {
            return validationError({ body: ["Payload must be a non-empty array"] });
        }

        const updatedCounts: number[] = [];

        for (const r of rows) {
            if (!r?.id_spek_mesin_hdr || !r.item_desc) continue;

            let fill_description: string | null;

            // Laravel update encodes only a slightly smaller set
            if (MULTI_FILL_ITEMS_UPDATE.has(r.item_desc)) {
                try {
                    fill_description = JSON.stringify(r.fill_description);
                } catch {
                    fill_description = null;
                }
            } else {
                const n = typeof r.fill_description === "number" ? r.fill_description : Number(r.fill_description);
                fill_description = Number.isFinite(n) ? String(n) : null;
            }

            const res = await prisma.transaksi_spesifikasi_mesin_dtl.updateMany({
                where: {
                    id_spek_mesin_hdr: r.id_spek_mesin_hdr,
                    item_desc: r.item_desc,
                },
                data: {
                    fill_description,
                    results: r.results ?? null,
                },
            });

            updatedCounts.push(res.count);
        }

        return NextResponse.json(
            {
                success: true,
                message: "Transaksi Spesifikasi Mesin Detail updated successfully.",
                data: updatedCounts,
            },
            { status: 200 },
        );
    } catch (e) {
        return serverError(e);
    }
}
