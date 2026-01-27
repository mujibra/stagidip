import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { parseBody } from "@/lib/parseBody";
import { serverError, validationError } from "@/lib/http/errorResponse";
import { toJsonSafe } from "@/lib/serialize";

export const runtime = "nodejs";

function toInt(v: string): number | null {
    const n = Number(v);
    return Number.isFinite(n) ? n : null;
}

function parseFillDescriptionIds(fill: string | null): number[] {
    if (!fill) return [];

    // Laravel stores:
    // - "123" (string number)
    // - "[123,456]" JSON array
    // - null
    const trimmed = fill.trim();

    if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
        try {
            const parsed: unknown = JSON.parse(trimmed);
            if (Array.isArray(parsed)) {
                const out: number[] = [];
                for (const x of parsed) {
                    const n = typeof x === "number" ? x : Number(x);
                    if (Number.isFinite(n)) out.push(n);
                }
                return out;
            }
        } catch {
            return [];
        }
        return [];
    }

    const single = Number(trimmed);
    if (Number.isFinite(single)) return [single];

    return [];
}

type ParentRow = {
    id: number;
    parent: string;
    type_atm: string | null;
    created_at: Date | null;
    updated_at: Date | null;
};

type ChildRow = {
    id: number;
    id_parent: number;
    val: string;
    label: string;
    created_at: Date | null;
    updated_at: Date | null;
};

type ItemRow = {
    id: number;
    item_id: number;
    item_code: string;
    description: string;
    created_at: Date;
    updated_at: Date | null;
};

type DetailNewRow = {
    id: number;
    id_spek_mesin_hdr: number | null;
    id_parent: number | null;
    item_parent: string;
    fill_description: string | null;
    results: string | null;
    created_at: Date;
    updated_at: Date | null;
};

// Mirrors getByIdSpekNew($idHeader)
export async function GET(_req: NextRequest, ctx: { params: Promise<{ idHeader: string }> }) {
    try {
        const { idHeader } = await ctx.params;
        const headerId = toInt(idHeader);
        if (!headerId) return validationError({ idHeader: ["Invalid idHeader"] });

        const header = await prisma.transaksi_spesifikasi_mesin.findFirst({
            where: { id: headerId },
        });

        if (!header) {
            return NextResponse.json({
                success: true,
                totalDatas: 0,
                datas: [],
                specification_dtl_status: false,
                timer_spesification: null,
            });
        }

        const model = await prisma.models.findFirst({
            where: { id: header.model },
            select: { name: true },
        });

        const typeMesin = model?.name ?? "";

        const parents = await prisma.mst_parent_type_spesifikasi_msn.findMany({
            where: { type_atm: { contains: typeMesin } },
        });

        const detailsExist = await prisma.transaksi_spesifikasi_mesin_dtl_new.findFirst({
            where: { id_spek_mesin_hdr: headerId },
            select: { id: true },
        });

        const allDetails = detailsExist
            ? await prisma.transaksi_spesifikasi_mesin_dtl_new.findMany({
                  where: { id_spek_mesin_hdr: headerId },
              })
            : [];

        // Map detail rows by parent id
        const detailByParent = new Map<number, DetailNewRow>();
        for (const d of allDetails) {
            if (d.id_parent !== null) detailByParent.set(d.id_parent, d);
        }

        // Preload children per parent
        const parentIds = parents.map((p) => p.id);
        const allChildren = parentIds.length
            ? await prisma.mst_type_spesifikasi_msn.findMany({
                  where: { id_parent: { in: parentIds } },
              })
            : [];

        const childrenByParent = new Map<number, ChildRow[]>();
        for (const c of allChildren) {
            const arr = childrenByParent.get(c.id_parent) ?? [];
            arr.push(c);
            childrenByParent.set(c.id_parent, arr);
        }

        // Preload all items by item_code (child.val)
        const itemCodes = Array.from(new Set(allChildren.map((c) => c.val)));
        const items = itemCodes.length
            ? await prisma.mst_spesifikasi_mesin_fnew.findMany({
                  where: { item_code: { in: itemCodes } },
              })
            : [];

        const itemsByCode = new Map<string, ItemRow[]>();
        for (const it of items) {
            const arr = itemsByCode.get(it.item_code) ?? [];
            arr.push(it);
            itemsByCode.set(it.item_code, arr);
        }

        let specificationDtlStatus = false;

        const datas = parents.map((p: ParentRow) => {
            const childList = childrenByParent.get(p.id) ?? [];
            const selectedDetail = detailByParent.get(p.id) ?? null;

            const fillIds = selectedDetail ? parseFillDescriptionIds(selectedDetail.fill_description) : [];
            const parentResults = selectedDetail ? selectedDetail.results : null;

            if (selectedDetail) specificationDtlStatus = true;

            const mappedChildren = childList.map((c: ChildRow, index: number) => {
                const listItem = itemsByCode.get(c.val) ?? [];

                const idPicked = fillIds[index] ?? null;
                const itemSelected = idPicked !== null ? (listItem.find((it) => it.id === idPicked) ?? null) : null;

                return {
                    ...c,
                    list_item: listItem,
                    item_selected: itemSelected,
                    specification_dtl_status: selectedDetail !== null,
                };
            });

            // Laravel mutates parent row: results + data_item, and unsets type_atm
            return {
                id: p.id,
                parent: p.parent,
                created_at: p.created_at,
                updated_at: p.updated_at,
                results: parentResults,
                data_item: mappedChildren,
            };
        });

        return NextResponse.json({
            success: true,
            totalDatas: datas.length,
            datas: toJsonSafe(datas),
            specification_dtl_status: specificationDtlStatus,
            timer_spesification: header.time_todo ?? null,
        });
    } catch (e) {
        return serverError(e);
    }
}

type UpdateRow = {
    id_spek_mesin_hdr: number;
    id_parent: number;
    item_parent: string;
    fill_description: unknown; // array or null
    results?: string | null;
};

function normalizeFillDescription(v: unknown): string | null {
    // Laravel logic:
    // - if array length 1 and [0] != null => store "123" without brackets
    // - if array length 1 and [0] == null => NULL
    // - if array length > 1 => store JSON string
    // - else => NULL

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

// Mirrors update($idHeader)
export async function PUT(req: NextRequest, ctx: { params: Promise<{ idHeader: string }> }) {
    try {
        const { idHeader } = await ctx.params;
        const headerId = toInt(idHeader);
        if (!headerId) return validationError({ idHeader: ["Invalid idHeader"] });

        const rows = await parseBody<UpdateRow[]>(req);

        if (!Array.isArray(rows) || rows.length === 0) {
            return validationError({ body: ["Payload must be a non-empty array"] });
        }

        const headerExists = await prisma.transaksi_spesifikasi_mesin.findFirst({
            where: { id: headerId },
            select: { id: true },
        });

        if (!headerExists) {
            return NextResponse.json({ success: false, message: "Header not found" }, { status: 400 });
        }

        const updated: number[] = [];

        for (const r of rows) {
            if (!r || typeof r !== "object") continue;

            const fill = normalizeFillDescription(r.fill_description);

            // Laravel only updates when fill_description is array
            if (!Array.isArray(r.fill_description)) continue;

            const res = await prisma.transaksi_spesifikasi_mesin_dtl_new.updateMany({
                where: {
                    id_spek_mesin_hdr: r.id_spek_mesin_hdr,
                    id_parent: r.id_parent,
                    item_parent: r.item_parent,
                },
                data: {
                    fill_description: fill,
                    results: r.results ?? null,
                },
            });

            updated.push(res.count);
        }

        return NextResponse.json(
            {
                success: true,
                message: "Transaksi Spesifikasi Mesin Detail updated successfully.",
                data: updated,
            },
            { status: 200 },
        );
    } catch (e) {
        return serverError(e);
    }
}
