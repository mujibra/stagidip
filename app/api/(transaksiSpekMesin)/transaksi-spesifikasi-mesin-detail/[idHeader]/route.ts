import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
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

function toIntParam(v: string): number | null {
    const n = Number(v);
    return Number.isFinite(n) ? n : null;
}

function parseIdListJson(text: string | null): number[] {
    if (!text) return [];
    try {
        const parsed: unknown = JSON.parse(text);
        if (!Array.isArray(parsed)) return [];
        const ids: number[] = [];
        for (const x of parsed) {
            const n = typeof x === "number" ? x : Number(x);
            if (Number.isFinite(n)) ids.push(n);
        }
        return ids;
    } catch {
        return [];
    }
}

function parseSingleId(text: string | null): number | null {
    if (!text) return null;
    const n = Number(text);
    return Number.isFinite(n) ? n : null;
}

type DetailOut = {
    id: number;
    id_spek_mesin_hdr: number | null;
    item_desc: string;
    fill_description: unknown; // object or array of objects or null
    results: string | null;
    created_at: Date;
    updated_at: Date | null;
};

// Mirrors TransaksiSpesifikasiMesinDetailController@getByIdSpek
export async function GET(_req: NextRequest, ctx: { params: Promise<{ idHeader: string }> }) {
    try {
        const { idHeader } = await ctx.params;
        const headerId = toIntParam(idHeader);
        if (!headerId) return validationError({ idHeader: ["Invalid idHeader"] });

        const header = await prisma.transaksi_spesifikasi_mesin.findFirst({
            where: { id: headerId },
            select: { id: true },
        });

        if (!header) {
            return NextResponse.json({
                success: true,
                totalDatas: 0,
                data: [],
                status: false,
            });
        }

        const details = await prisma.transaksi_spesifikasi_mesin_dtl.findMany({
            where: { id_spek_mesin_hdr: header.id },
            orderBy: { id: "asc" },
        });

        // Collect all spec IDs we need to hydrate
        const neededIds = new Set<number>();

        for (const d of details) {
            if (MULTI_FILL_ITEMS.has(d.item_desc)) {
                const ids = parseIdListJson(d.fill_description);
                for (const id of ids) neededIds.add(id);
            } else {
                const id = parseSingleId(d.fill_description);
                if (id !== null) neededIds.add(id);
            }
        }

        const specs = neededIds.size
            ? await prisma.mst_spesifikasi_mesin.findMany({
                  where: { id: { in: Array.from(neededIds) } },
              })
            : [];

        const specById = new Map<number, { id: number; item: string; description: string }>();
        for (const s of specs) {
            specById.set(s.id, { id: s.id, item: s.item, description: s.description });
        }

        const out: DetailOut[] = details.map((d) => {
            if (MULTI_FILL_ITEMS.has(d.item_desc)) {
                const ids = parseIdListJson(d.fill_description);
                const expanded = ids.map((id) => specById.get(id)).filter((x): x is { id: number; item: string; description: string } => !!x);

                return {
                    id: d.id,
                    id_spek_mesin_hdr: d.id_spek_mesin_hdr,
                    item_desc: d.item_desc,
                    fill_description: expanded,
                    results: d.results ?? null,
                    created_at: d.created_at,
                    updated_at: d.updated_at ?? null,
                };
            }

            const id = parseSingleId(d.fill_description);
            const expanded = id !== null ? (specById.get(id) ?? null) : null;

            return {
                id: d.id,
                id_spek_mesin_hdr: d.id_spek_mesin_hdr,
                item_desc: d.item_desc,
                fill_description: expanded,
                results: d.results ?? null,
                created_at: d.created_at,
                updated_at: d.updated_at ?? null,
            };
        });

        return NextResponse.json({
            success: true,
            totalDatas: out.length,
            data: toJsonSafe(out),
            status: out.length > 0,
        });
    } catch (e) {
        return serverError(e);
    }
}
