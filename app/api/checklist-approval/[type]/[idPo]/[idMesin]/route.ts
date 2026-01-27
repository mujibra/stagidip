import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { parseBody } from "@/lib/parseBody";
import { serverError, validationError } from "@/lib/http/errorResponse";
import { toJsonSafe } from "@/lib/serialize";

export const runtime = "nodejs";

type ChecklistApprovalBody = {
    approval_by?: string | number;
};

function sanitizeUser(user: Record<string, unknown>) {
    const sanitized = { ...user } as Record<string, unknown>;
    delete sanitized.reset_code;
    delete sanitized.email_verified_at;
    delete sanitized.reset_code_expired_at;
    delete sanitized.created_at;
    delete sanitized.updated_at;
    return sanitized;
}

export async function PUT(req: NextRequest, ctx: { params: { type: string; idPo: string; idMesin: string } }) {
    try {
        const type = ctx.params.type;
        const idPo = Number(ctx.params.idPo);
        const idMesin = Number(ctx.params.idMesin);
        const body = await parseBody<ChecklistApprovalBody>(req);
        const approvalBy = body.approval_by ? Number(body.approval_by) : null;

        if (!approvalBy) {
            return validationError({ approval_by: ["Approval by wajib diisi"] });
        }

        const data =
            type === "STAGING"
                ? { approval_staging: approvalBy }
                : { approval_tss: approvalBy };

        const updated = await prisma.transaksi_checklist_stag_approval.updateMany({
            where: { id_po: idPo, no_mesin: idMesin },
            data,
        });

        if (updated.count > 0) {
            return NextResponse.json({
                success: true,
                message: type === "STAGING" ? "Update Approval Staging was successfully" : "Update Approval TSS was successfully",
            });
        }

        return NextResponse.json(
            {
                success: false,
                message: type === "STAGING" ? "Update Approval by Mover Errors." : "Update Approval by TSS Errors.",
            },
            { status: 400 }
        );
    } catch (error) {
        return serverError(error);
    }
}

export async function GET(_req: NextRequest, ctx: { params: { type: string; idPo: string; idMesin: string } }) {
    try {
        const type = ctx.params.type;
        const idPo = Number(ctx.params.idPo);
        const idMesin = Number(ctx.params.idMesin);

        const record = await prisma.transaksi_checklist_stag_approval.findFirst({
            where: { id_po: idPo, no_mesin: idMesin },
        });

        if (!record) {
            return NextResponse.json({
                success: false,
                data: record,
            });
        }

        const approvalId = type === "STAGING" ? record.approval_staging : record.approval_tss;
        if (!approvalId) {
            return NextResponse.json({
                success: true,
                data: [],
            });
        }

        const user = await prisma.users.findUnique({
            where: { id: BigInt(approvalId) },
        });

        const data = user ? [sanitizeUser(user as unknown as Record<string, unknown>)] : [];

        return NextResponse.json({
            success: true,
            data: toJsonSafe(data),
        });
    } catch (error) {
        return serverError(error);
    }
}
