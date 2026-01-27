import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { serverError } from "@/lib/http/errorResponse";
import { serializeId } from "@/lib/serialize";

export const runtime = "nodejs";

export async function DELETE(_req: Request, ctx: { params: { idStatusPo: string } }) {
    try {
        const idStatusPo = Number(ctx.params.idStatusPo);

        const deleted = await prisma.mst_status_po.delete({
            where: { id: idStatusPo },
        });

        return NextResponse.json({
            success: true,
            message: "Status PO berhasil dihapus",
            data: serializeId(deleted),
        });
    } catch (error) {
        return serverError(error);
    }
}
