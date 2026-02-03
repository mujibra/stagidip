import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { parseBody } from "@/lib/parseBody";
import { serverError } from "@/lib/http/errorResponse";

export const runtime = "nodejs";

type ApprovalBody = {
    approval_by?: number | string | null;
};

function toNumber(value: unknown): number | null {
    if (value === null || value === undefined || value === "") return null;
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
}

export async function PUT(
    req: NextRequest,
    context: { params: Promise<{ type: string; idPo: string; idMesin: string }> }
) {
    try {
        const type = (await context.params).type.toUpperCase();
        const idPo = toNumber((await context.params).idPo);
        const idMesin = toNumber((await context.params).idMesin);
        const body = await parseBody<ApprovalBody>(req);
        const approvalBy = toNumber(body.approval_by);

        if (!idPo || !idMesin || !approvalBy) {
            return NextResponse.json(
                { success: false, message: "Approval update failed" },
                { status: 400 }
            );
        }

        const data: Record<string, number> = {};
        if (type === "MOVER") data.approval_by_mover = approvalBy;
        else if (type === "TSS") data.approval_by_tss = approvalBy;
        else data.approval_by_datindo = approvalBy;

        const result = await prisma.transaksi_inspeksi_approval.updateMany({
            where: { id_po: idPo, no_mesin: idMesin },
            data,
        });

        if (result.count > 0) {
            const message =
                type === "MOVER"
                    ? "Approval by Mover is successfully Updated"
                    : type === "TSS"
                      ? "Approval by TSS is successfully Updated"
                      : "Approval by Datindo is successfully Updated";

            return NextResponse.json({ success: true, message });
        }

        const failedMessage =
            type === "MOVER"
                ? "Approval by Mover is Failed"
                : type === "TSS"
                  ? "Approval by TSS is Failed"
                  : "Approval by Datindo is Failed";

        return NextResponse.json(
            { success: false, message: failedMessage },
            { status: 400 }
        );
    } catch (error) {
        return serverError(error);
    }
}
