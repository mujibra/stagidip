import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { parseBody } from "@/lib/parseBody";
import { serverError, validationError } from "@/lib/http/errorResponse";
import { serializeId } from "@/lib/serialize";

export const runtime = "nodejs";

type UpdateStatusPoDTO = {
    status_desc?: string;
};

export async function PUT(req: NextRequest, ctx: { params: Promise<{ idStatusPo: string }> }) {
    try {
        const idStatusPo = Number((await ctx.params).idStatusPo);
        const body = await parseBody<UpdateStatusPoDTO>(req);
        const status_desc = (body.status_desc ?? "").trim();

        if (!status_desc) {
            return validationError({ status_desc: ["Status PO wajib diisi"] });
        }

        const updated = await prisma.mst_status_po.update({
            where: { id: idStatusPo },
            data: {
                status_desc,
                updated_at: new Date(),
            },
        });

        return NextResponse.json({
            success: true,
            message: "Status PO berhasil diupdate",
            data: serializeId(updated),
        });
    } catch (error) {
        return serverError(error);
    }
}
