import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { serverError } from "@/lib/http/errorResponse";
import { toJsonSafe } from "@/lib/serialize";

export const runtime = "nodejs";

function toNumber(value: string): number | null {
    const n = Number(value);
    return Number.isFinite(n) ? n : null;
}

export async function GET(_req: NextRequest, context: { params: { idPo: string } }) {
    try {
        const idPo = toNumber(context.params.idPo);
        if (!idPo) return NextResponse.json({ success: true, data: [] });

        const po = await prisma.tbl_po.findFirst({ where: { id: idPo } });
        if (!po) return NextResponse.json({ success: true, data: [] });

        const [model, gudang, customer, pic, mesin, batch, style] = await Promise.all([
            po.model ? prisma.models.findFirst({ where: { id: po.model } }) : Promise.resolve(null),
            po.nama_gudang ? prisma.mst_gudang.findFirst({ where: { id: po.nama_gudang } }) : Promise.resolve(null),
            po.customer ? prisma.mst_customer.findFirst({ where: { id: po.customer } }) : Promise.resolve(null),
            po.pic_staging ? prisma.pic_mitra.findFirst({ where: { id: po.pic_staging } }) : Promise.resolve(null),
            po.id_type_mesin ? prisma.mst_mesin.findFirst({ where: { id: po.id_type_mesin } }) : Promise.resolve(null),
            po.batch ? prisma.bacth_po.findFirst({ where: { id: BigInt(po.batch) } }).catch(() => null) : Promise.resolve(null),
            po.style ? prisma.mst_style.findFirst({ where: { id: po.style } }) : Promise.resolve(null),
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
