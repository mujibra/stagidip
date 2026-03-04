import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { serverError, validationError } from "@/lib/http/errorResponse";
import { hasValidationErrors, toNumber } from "@/lib/http/validation";
import { toJsonSafe } from "@/lib/serialize";
import { validateIdPoParam } from "@/lib/http/purchaseOrderRuntimeValidation";

export const runtime = "nodejs";

export async function GET(_req: NextRequest, context: { params: Promise<{ idPo: string }> }) {
    try {
        const params = await context.params;
        const errors = validateIdPoParam(params.idPo);

        if (hasValidationErrors(errors)) {
            return validationError(errors);
        }

        const idPo = toNumber(params.idPo)!;

        const po = await prisma.tbl_po.findFirst({ where: { id: idPo } });
        if (!po) {
            return NextResponse.json({ success: false, type: "NOT_FOUND", message: "Purchase Order tidak ditemukan", data: [] }, { status: 404 });
        }

        const styleId = po.style ? toNumber(String(po.style)) : null;
        const [model, gudang, customer, pic, mesin, batch, style] = await Promise.all([
            po.model ? prisma.models.findFirst({ where: { id: po.model } }) : Promise.resolve(null),
            po.nama_gudang ? prisma.mst_gudang.findFirst({ where: { id: po.nama_gudang } }) : Promise.resolve(null),
            po.customer ? prisma.mst_customer.findFirst({ where: { id: po.customer } }) : Promise.resolve(null),
            po.pic_staging ? prisma.pic_mitra.findFirst({ where: { id: po.pic_staging } }) : Promise.resolve(null),
            po.id_type_mesin ? prisma.mst_mesin.findFirst({ where: { id: po.id_type_mesin } }) : Promise.resolve(null),
            po.batch ? prisma.bacth_po.findFirst({ where: { id: BigInt(po.batch) } }).catch(() => null) : Promise.resolve(null),
            styleId ? prisma.mst_style.findFirst({ where: { id: styleId } }) : Promise.resolve(null),
        ]);

        return NextResponse.json({
            success: true,
            data: toJsonSafe({
                ...po,
                model,
                gudang,
                customer,
                pic_staging: pic,
                mesin,
                batch,
                style,
            }),
        });
    } catch (error) {
        return serverError(error);
    }
}
