import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { parseBody } from "@/lib/parseBody";
import { serverErrorWithRequestId, validationError } from "@/lib/http/errorResponse";
import { createApiRequestContext } from "@/lib/http/observability";
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

function jsonWithRequestId(body: Record<string, unknown>, requestId: string, status = 200) {
    return NextResponse.json(body, {
        status,
        headers: {
            "X-Request-ID": requestId,
        },
    });
}

export async function PUT(req: NextRequest, ctx: { params: Promise<{ type: string; idPo: string; idMesin: string }> }) {
    const requestContext = createApiRequestContext(req, "api.checklistApproval.PUT");

    try {
        const type = (await ctx.params).type;
        const idPo = Number((await ctx.params).idPo);
        const idMesin = Number((await ctx.params).idMesin);
        const body = await parseBody<ChecklistApprovalBody>(req);
        const approvalBy = body.approval_by ? Number(body.approval_by) : null;

        if (!approvalBy) {
            requestContext.warn("checklist_approval.validation_failed", { reason: "approval_by_required" });
            return validationError({ approval_by: ["Approval by wajib diisi"] });
        }

        const data = type === "STAGING" ? { approval_staging: approvalBy } : { approval_tss: approvalBy };

        const updated = await prisma.transaksi_checklist_stag_approval.updateMany({
            where: { id_po: idPo, no_mesin: idMesin },
            data,
        });

        if (updated.count > 0) {
            requestContext.done("request.completed", { statusCode: 200, updatedCount: updated.count });
            return jsonWithRequestId(
                {
                    success: true,
                    requestId: requestContext.requestId,
                    message: type === "STAGING" ? "Update Approval Staging was successfully" : "Update Approval TSS was successfully",
                },
                requestContext.requestId
            );
        }

        requestContext.warn("checklist_approval.no_rows_updated", { idPo, idMesin, type });
        return jsonWithRequestId(
            {
                success: false,
                requestId: requestContext.requestId,
                message: type === "STAGING" ? "Update Approval by Mover Errors." : "Update Approval by TSS Errors.",
            },
            requestContext.requestId,
            400
        );
    } catch (error) {
        requestContext.error("checklist_approval.put_failed", error);
        return serverErrorWithRequestId(requestContext.requestId);
    }
}

export async function GET(req: NextRequest, ctx: { params: Promise<{ type: string; idPo: string; idMesin: string }> }) {
    const requestContext = createApiRequestContext(req, "api.checklistApproval.GET");

    try {
        const type = (await ctx.params).type;
        const idPo = Number((await ctx.params).idPo);
        const idMesin = Number((await ctx.params).idMesin);

        const record = await prisma.transaksi_checklist_stag_approval.findFirst({
            where: { id_po: idPo, no_mesin: idMesin },
        });

        if (!record) {
            requestContext.warn("checklist_approval.not_found", { idPo, idMesin, type });
            return jsonWithRequestId(
                {
                    success: false,
                    requestId: requestContext.requestId,
                    data: record,
                },
                requestContext.requestId
            );
        }

        const approvalId = type === "STAGING" ? record.approval_staging : record.approval_tss;
        if (!approvalId) {
            return jsonWithRequestId(
                {
                    success: true,
                    requestId: requestContext.requestId,
                    data: [],
                },
                requestContext.requestId
            );
        }

        const user = await prisma.users.findUnique({
            where: { id: BigInt(approvalId) },
        });

        const data = user ? [sanitizeUser(user as unknown as Record<string, unknown>)] : [];

        requestContext.done("request.completed", { statusCode: 200, resultCount: data.length });
        return jsonWithRequestId(
            {
                success: true,
                requestId: requestContext.requestId,
                data: toJsonSafe(data),
            },
            requestContext.requestId
        );
    } catch (error) {
        requestContext.error("checklist_approval.get_failed", error);
        return serverErrorWithRequestId(requestContext.requestId);
    }
}
