import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { parseBody } from "@/lib/parseBody";
import { serverError, validationError } from "@/lib/http/errorResponse";
import { toJsonSafe } from "@/lib/serialize";
import { toPositiveInt } from "@/lib/services/purchaseOrderInsights";

export const runtime = "nodejs";

type InsertImsBody = {
    no_po?: string;
    id_po_master?: number | string;
    id_type_mesin?: number | string;
    jumlah?: number | string;
    status_po?: string;
};

export async function POST(req: NextRequest) {
    try {
        const body = await parseBody<InsertImsBody>(req);

        const idPoMaster = body.id_po_master !== undefined ? toPositiveInt(String(body.id_po_master)) : null;
        const idTypeMesin = body.id_type_mesin !== undefined ? toPositiveInt(String(body.id_type_mesin)) : null;
        const jumlah = body.jumlah !== undefined ? toPositiveInt(String(body.jumlah)) : null;

        if (!body.no_po?.trim()) return validationError({ no_po: ["no_po wajib diisi"] });
        if (!idTypeMesin) return validationError({ id_type_mesin: ["id_type_mesin wajib diisi dan valid"] });
        if (!jumlah) return validationError({ jumlah: ["jumlah wajib diisi dan valid"] });

        const created = await prisma.tbl_po.create({
            data: {
                no_po: body.no_po.trim(),
                id_po_master: idPoMaster ?? undefined,
                id_type_mesin: idTypeMesin,
                jumlah,
                status_po: body.status_po?.trim() || "IMS_IMPORTED",
                created_at: new Date(),
                updated_at: new Date(),
            },
        });

        return NextResponse.json({ success: true, message: "Data IMS berhasil disimpan", data: toJsonSafe(created) });
    } catch (error) {
        return serverError(error);
    }
}
