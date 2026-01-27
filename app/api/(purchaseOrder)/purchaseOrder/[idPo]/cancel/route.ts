import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { serverError } from "@/lib/http/errorResponse";
import { toJsonSafe } from "@/lib/serialize";

export const runtime = "nodejs";

type SnMesinItem = {
    idMesin: number;
    snMesin: string;
};

function parseSnMesins(raw: string | null): SnMesinItem[] | null {
    if (!raw) return null;

    try {
        const parsed: unknown = JSON.parse(raw);
        if (!Array.isArray(parsed)) return null;

        const cleaned: SnMesinItem[] = [];
        for (const item of parsed) {
            if (typeof item !== "object" || item === null) continue;

            const idMesinRaw = (item as Record<string, unknown>)["idMesin"];
            const snMesinRaw = (item as Record<string, unknown>)["snMesin"];

            const idMesin = Number(idMesinRaw);
            const snMesin = typeof snMesinRaw === "string" ? snMesinRaw : "";

            if (Number.isFinite(idMesin) && idMesin > 0 && snMesin) {
                cleaned.push({ idMesin, snMesin });
            }
        }

        return cleaned.length ? cleaned : null;
    } catch {
        return null;
    }
}

async function cancelPO(idPo: number) {
    const selectPo = await prisma.tbl_po.findUnique({ where: { id: idPo } });

    if (!selectPo) {
        return NextResponse.json({ success: false, message: "Data tidak ditemukan" }, { status: 404 });
    }

    // mirror Laravel: always set Cancel + deleted_at
    const now = new Date();
    await prisma.tbl_po.update({
        where: { id: idPo },
        data: {
            status_po: "Cancel",
            deleted_at: now,
        },
    });

    // Laravel behavior:
    // $data_sn = json_decode(sn_mesins) if exists
    const dataSn = parseSnMesins(selectPo.sn_mesins ?? null);

    // If this PO was created from dummy + has sn_mesins,
    // then release STATUS_MESIN in dummy staging table + remove history rows.
    if (selectPo.copy_from_id_po && dataSn) {
        const fromIdPo = Number(selectPo.copy_from_id_po);

        if (Number.isFinite(fromIdPo) && fromIdPo > 0) {
            for (const item of dataSn) {
                // UPDATE crt_{fromIdPo} SET STATUS_MESIN = NULL WHERE id = {idMesin}
                await prisma.$executeRawUnsafe(`UPDATE crt_${fromIdPo} SET STATUS_MESIN = NULL WHERE id = ${item.idMesin}`);

                // PurchaseOrderHistoryCopyFromDummy::where(...)->delete();
                // Prisma model: tbl_po_history_dummy_to_valid
                await prisma.tbl_po_history_dummy_to_valid.deleteMany({
                    where: {
                        from_id_po: fromIdPo,
                        to_id_po: idPo,
                        no_mesin: String(item.idMesin),
                        sn_mesin: item.snMesin,
                    },
                });
            }
        }
    }

    // drop table crt_{idPo}
    try {
        await prisma.$executeRawUnsafe(`DROP TABLE crt_${idPo}`);
    } catch {
        return NextResponse.json(
            {
                success: false,
                message: `PO ${selectPo.no_po ?? ""} gagal di cancel`,
            },
            { status: 400 },
        );
    }

    return NextResponse.json(
        {
            success: true,
            message: `PO ${selectPo.no_po ?? ""} berhasil di cancel`,
            data: toJsonSafe(selectPo),
        },
        { status: 200 },
    );
}

// Support both POST and PUT so frontend can call either without drama.
export async function POST(_req: NextRequest, ctx: { params: { idPo: string } }) {
    try {
        const idPo = Number(ctx.params.idPo);
        if (!Number.isFinite(idPo) || idPo <= 0) {
            return NextResponse.json({ success: false, message: "idPo tidak valid" }, { status: 400 });
        }
        return await cancelPO(idPo);
    } catch (error) {
        return serverError(error);
    }
}

export async function PUT(req: NextRequest, ctx: { params: { idPo: string } }) {
    return POST(req, ctx);
}
