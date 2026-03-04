import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { serverError, validationError } from "@/lib/http/errorResponse";
import { hasValidationErrors, isPrismaNotFoundError, toNumber } from "@/lib/http/validation";
import { toJsonSafe } from "@/lib/serialize";
import { parseSnMesinItems, validateIdPoParam } from "@/lib/http/purchaseOrderRuntimeValidation";

export const runtime = "nodejs";

async function cancelPO(idPo: number) {
    const selectPo = await prisma.tbl_po.findUnique({ where: { id: idPo } });

    if (!selectPo) {
        return NextResponse.json({ success: false, type: "NOT_FOUND", message: "Data tidak ditemukan" }, { status: 404 });
    }

    const now = new Date();
    await prisma.tbl_po.update({
        where: { id: idPo },
        data: {
            status_po: "Cancel",
            deleted_at: now,
        },
    });

    const dataSn = parseSnMesinItems(selectPo.sn_mesins ?? null);

    if (selectPo.copy_from_id_po && dataSn) {
        const fromIdPo = Number(selectPo.copy_from_id_po);

        if (Number.isFinite(fromIdPo) && fromIdPo > 0) {
            for (const item of dataSn) {
                await prisma.$executeRawUnsafe(`UPDATE crt_${fromIdPo} SET STATUS_MESIN = NULL WHERE id = ?`, item.idMesin);

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

    try {
        await prisma.$executeRawUnsafe(`DROP TABLE crt_${idPo}`);
    } catch {
        return NextResponse.json(
            {
                success: false,
                message: `PO ${selectPo.no_po ?? ""} gagal di cancel`,
            },
            { status: 400 }
        );
    }

    return NextResponse.json(
        {
            success: true,
            message: `PO ${selectPo.no_po ?? ""} berhasil di cancel`,
            data: toJsonSafe(selectPo),
        },
        { status: 200 }
    );
}

export async function POST(_req: NextRequest, ctx: { params: Promise<{ idPo: string }> }) {
    try {
        const params = await ctx.params;
        const errors = validateIdPoParam(params.idPo);

        if (hasValidationErrors(errors)) {
            return validationError(errors);
        }

        const idPo = toNumber(params.idPo)!;
        return await cancelPO(idPo);
    } catch (error) {
        if (isPrismaNotFoundError(error)) {
            return NextResponse.json({ success: false, type: "NOT_FOUND", message: "Data tidak ditemukan" }, { status: 404 });
        }
        return serverError(error);
    }
}

export async function PUT(req: NextRequest, ctx: { params: Promise<{ idPo: string }> }) {
    return POST(req, ctx);
}
