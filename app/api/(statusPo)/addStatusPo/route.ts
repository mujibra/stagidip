import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { parseBody } from "@/lib/parseBody";
import { serverError, validationError } from "@/lib/http/errorResponse";
import { serializeId } from "@/lib/serialize";

export const runtime = "nodejs";

type CreateStatusPoDTO = {
    status_desc?: string;
};

export async function POST(req: NextRequest) {
    try {
        const body = await parseBody<CreateStatusPoDTO>(req);
        const status_desc = (body.status_desc ?? "").trim();

        if (!status_desc) {
            return validationError({ status_desc: ["Status PO wajib diisi"] });
        }

        const created = await prisma.mst_status_po.create({
            data: {
                status_desc,
                created_at: new Date(),
                updated_at: new Date(),
            },
        });

        return NextResponse.json({
            success: true,
            message: "Status PO berhasil ditambahkan",
            data: serializeId(created),
        });
    } catch (error) {
        return serverError(error);
    }
}
