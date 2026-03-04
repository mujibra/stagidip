import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@/app/generated/prisma";

import { prisma } from "@/lib/prisma";
import { parseBody } from "@/lib/parseBody";
import { badRequestError, notFoundError, serverError, validationError } from "@/lib/http/errorResponse";
import { hasValidationErrors, isPrismaNotFoundError, toDate, toNumber } from "@/lib/http/validation";
import { validateMasterIdParam, validateRequiredName } from "@/lib/http/masterDataValidation";
import { toJsonSafe } from "@/lib/serialize";

export const runtime = "nodejs";

type MasterPoBody = {
    no_po_master?: string;
    tgl_po?: string;
    id_customer?: string;
    status_po?: string;
};

function parseCustomerIds(values: Array<string | null | undefined>): number[] {
    return Array.from(new Set(values.map((id) => toNumber(id)).filter((id): id is number => Number.isInteger(id) && id > 0)));
}

export async function GET(_req: NextRequest, ctx: { params: Promise<{ idPoMaster: string }> }) {
    try {
        const { idPoMaster } = await ctx.params;
        const idErrors = validateMasterIdParam(idPoMaster);
        if (hasValidationErrors(idErrors)) return validationError(idErrors);

        const idPoMasterNum = toNumber(idPoMaster)!;
        const masterPos = await prisma.mst_po.findMany({ where: { id: idPoMasterNum, deleted_at: null } });

        if (!masterPos.length) return notFoundError("Data tidak ditemukan", { data: [] });

        const customerIds = parseCustomerIds(masterPos.map((po) => po.id_customer));
        const customers = customerIds.length ? await prisma.mst_customer.findMany({ where: { id: { in: customerIds } } }) : [];
        const customerMap = new Map(customers.map((c) => [String(c.id), c]));

        const data = masterPos.map((po) => ({
            ...po,
            customer: po.id_customer ? customerMap.get(po.id_customer) ?? null : null,
        }));

        return NextResponse.json({
            success: true,
            totalDatas: data.length,
            data: toJsonSafe(data),
        });
    } catch (error) {
        return serverError(error);
    }
}

export async function PUT(req: NextRequest, ctx: { params: Promise<{ idPoMaster: string }> }) {
    try {
        const { idPoMaster } = await ctx.params;
        const idErrors = validateMasterIdParam(idPoMaster);
        if (hasValidationErrors(idErrors)) return validationError(idErrors);

        const idPoMasterNum = toNumber(idPoMaster)!;
        const body = await parseBody<MasterPoBody>(req);

        const errors = {
            ...validateRequiredName(body.no_po_master, "no_po_master", "Nomor PO tidak boleh kosong"),
            ...validateRequiredName(body.id_customer, "id_customer", "Customer wajib dipilih"),
        };
        if (hasValidationErrors(errors)) return validationError(errors);

        const no_po_master = body.no_po_master!.trim();
        const id_customer = body.id_customer!.trim();

        const masterPo = await prisma.mst_po.findUnique({ where: { id: idPoMasterNum } });
        if (!masterPo) return notFoundError("Data tidak ditemukan");

        const hasTransactions = await prisma.tbl_po.findFirst({
            where: { id_po_master: idPoMasterNum },
            select: { id: true },
        });

        if (hasTransactions && masterPo.no_po_master !== no_po_master) {
            return badRequestError(
                `PO ${masterPo.no_po_master} Gagal di Edit, karena sudah terpakai di Transaksi Staging Registration`
            );
        }

        const tglPo = toDate(body.tgl_po);
        const updated = await prisma.mst_po.update({
            where: { id: idPoMasterNum },
            data: {
                no_po_master,
                id_customer,
                status_po: body.status_po ?? null,
                tgl_po: tglPo ?? undefined,
            },
        });

        return NextResponse.json({
            success: true,
            message: "PO Master was Updated.",
            data: toJsonSafe(updated),
        });
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
            return badRequestError("No PO Sudah ada, harap mengisi dengan No PO yang lain");
        }
        if (isPrismaNotFoundError(error)) return notFoundError("Data tidak ditemukan");
        return serverError(error);
    }
}

export async function DELETE(_req: NextRequest, ctx: { params: Promise<{ idPoMaster: string }> }) {
    try {
        const { idPoMaster } = await ctx.params;
        const idErrors = validateMasterIdParam(idPoMaster);
        if (hasValidationErrors(idErrors)) return validationError(idErrors);

        const idPoMasterNum = toNumber(idPoMaster)!;
        const hasTransactions = await prisma.tbl_po.findFirst({
            where: { id_po_master: idPoMasterNum },
            select: { id: true },
        });

        if (hasTransactions) {
            const masterPo = await prisma.mst_po.findUnique({ where: { id: idPoMasterNum } });
            return badRequestError(
                `PO ${masterPo?.no_po_master ?? ""} Gagal di hapus, karena sudah terpakai di Transaksi PO Registration`
            );
        }

        const deleted = await prisma.mst_po.update({
            where: { id: idPoMasterNum },
            data: { deleted_at: new Date() },
        });

        return NextResponse.json({
            success: true,
            message: `PO Master ${deleted.no_po_master} has been deleted.`,
            data: toJsonSafe(deleted),
        });
    } catch (error) {
        if (isPrismaNotFoundError(error)) return notFoundError("Data tidak ditemukan");
        return serverError(error);
    }
}
