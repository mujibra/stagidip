import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { parseBody } from "@/lib/parseBody";
import { validationError, serverError } from "@/lib/http/errorResponse";
import { serializeId } from "@/lib/serialize";
export const runtime = "nodejs";

type UpdateSpekMesinDTO = {
    item_code?: string;
    description?: string;
};

export async function PUT(req: NextRequest, { params }: { params: { idListItem: string } }) {
    try {
        const id = Number(params.idListItem);
        const body = await parseBody<UpdateSpekMesinDTO>(req);

        if (!body.item_code && !body.description) {
            return validationError({
                _form: ["Tidak ada data yang diupdate"],
            });
        }

        const exists = await prisma.mst_spesifikasi_mesin_fnew.findUnique({
            where: { id },
        });

        if (!exists) {
            return NextResponse.json({ success: false, message: "Data not found" }, { status: 404 });
        }

        const updated = await prisma.mst_spesifikasi_mesin_fnew.update({
            where: { id },
            data: body,
        });

        return NextResponse.json({
            success: true,
            message: "Item List was Updated.",
            data: serializeId(updated),
        });
    } catch (error) {
        return serverError(error);
    }
}

export async function DELETE(_: Request, { params }: { params: { idListItem: string } }) {
    try {
        const idListItem = Number(params.idListItem);

        const rows = await prisma.transaksi_spesifikasi_mesin_dtl_new.findMany({
            select: { fill_description: true },
        });

        const usedIds = new Set<number>();

        for (const row of rows) {
            if (!row.fill_description) continue;

            const parsed = JSON.parse(row.fill_description);

            if (Array.isArray(parsed)) {
                parsed.forEach((v) => v && usedIds.add(Number(v)));
            } else {
                usedIds.add(Number(parsed));
            }
        }

        if (usedIds.has(idListItem)) {
            const item = await prisma.mst_spesifikasi_mesin_fnew.findUnique({
                where: { id: idListItem },
            });

            return NextResponse.json(
                {
                    success: false,
                    message: `Remove Item List [${item?.item_code} - ${item?.description}] was Error, Because is using in the Specification Transactions !!`,
                },
                { status: 400 }
            );
        }

        const deleted = await prisma.mst_spesifikasi_mesin_fnew.delete({
            where: { id: idListItem },
        });

        return NextResponse.json({
            success: true,
            message: `Remove Item List [${deleted.item_code} - ${deleted.description}] has been deleted.`,
            data: serializeId(deleted),
        });
    } catch (error) {
        return serverError(error);
    }
}
