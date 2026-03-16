import { prisma } from "@/lib/prisma";

/**
 * Shared DB helpers for checklist-staging mutation routes.
 *
 * Source tables:
 * - transaksi_checklist_stag_approval
 * - transaksi_checklist_staging
 * - transaksi_checklist_stag_mv400
 * - dynamic crt_{id_po}
 */
export async function ensureChecklistApprovalRecord(params: {
    idPo: number;
    noMesin: number;
    snMesin: string;
}) {
    const approvalExists = await prisma.transaksi_checklist_stag_approval.count({
        where: {
            id_po: params.idPo,
            no_mesin: params.noMesin,
        },
    });

    if (approvalExists < 1) {
        await prisma.transaksi_checklist_stag_approval.create({
            data: {
                id_po: params.idPo,
                no_mesin: params.noMesin,
                sn_mesin: params.snMesin,
            },
        });
    }
}

export async function updateChecklistTimeTodo(params: { idPo: number; idMesin: number; timeTodo: string | null }) {
    if (!params.idPo || !params.idMesin || !params.timeTodo) return;
    const sql = `update crt_${params.idPo} set TIME_CHECKLIST = ? where id = ?`;
    await prisma.$executeRawUnsafe(sql, params.timeTodo, params.idMesin);
}
