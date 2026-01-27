import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { parseBody } from "@/lib/parseBody";
import { serverError, validationError } from "@/lib/http/errorResponse";
import { serializeId } from "@/lib/serialize";

export const runtime = "nodejs";

type ChecklistBody = {
    test_desc?: string;
    result_detail?: string;
    id_type_values?: number | string | null;
};

function toInt(value: unknown): number | null {
    if (value === null || value === undefined || value === "") return null;
    const num = Number(value);
    return Number.isFinite(num) ? num : null;
}

export async function POST(req: NextRequest, ctx: { params: { idMaster: string } }) {
    try {
        const idDivisi = toInt(ctx.params.idMaster);
        if (!idDivisi) {
            return validationError({ idDivisi: ["Id divisi tidak valid"] });
        }

        const body = await parseBody<ChecklistBody>(req);
        const test_desc = (body.test_desc ?? "").trim();
        const result_detail = (body.result_detail ?? "").trim();

        if (!test_desc) {
            return validationError({ test_desc: ["Test description tidak boleh kosong"] });
        }

        const divisi = await prisma.mst_divisi.findUnique({
            where: { id: idDivisi },
        });

        if (!divisi) {
            return NextResponse.json(
                { success: false, message: "Divisi tidak ditemukan" },
                { status: 400 }
            );
        }

        const created = await prisma.mst_checklist_staging.create({
            data: {
                id_divisi: idDivisi,
                id_mesin: divisi.id_mesin,
                test_desc,
                result_detail: result_detail || null,
                id_type_values: toInt(body.id_type_values),
            },
        });

        return NextResponse.json({
            success: true,
            message: "Checklist staging berhasil ditambahkan",
            data: serializeId(created),
        });
    } catch (error) {
        return serverError(error);
    }
}

export async function PUT(req: NextRequest, ctx: { params: { idMaster: string } }) {
    try {
        const idMaster = toInt(ctx.params.idMaster);
        if (!idMaster) {
            return validationError({ idMaster: ["Id master tidak valid"] });
        }

        const body = await parseBody<ChecklistBody>(req);
        const data: Record<string, unknown> = {};

        if (body.test_desc !== undefined) {
            const testDesc = String(body.test_desc).trim();
            if (!testDesc) {
                return validationError({ test_desc: ["Test description tidak boleh kosong"] });
            }
            data.test_desc = testDesc;
        }

        if (body.result_detail !== undefined) {
            data.result_detail = String(body.result_detail).trim();
        }

        if (body.id_type_values !== undefined) {
            data.id_type_values = toInt(body.id_type_values);
        }

        if (Object.keys(data).length === 0) {
            return validationError({ _form: ["Tidak ada data yang diupdate"] });
        }

        const updated = await prisma.mst_checklist_staging.update({
            where: { id: idMaster },
            data,
        });

        return NextResponse.json({
            success: true,
            message: "Checklist staging berhasil diupdate",
            data: serializeId(updated),
        });
    } catch (error) {
        return serverError(error);
    }
}

export async function DELETE(_req: NextRequest, ctx: { params: { idMaster: string } }) {
    try {
        const idMaster = toInt(ctx.params.idMaster);
        if (!idMaster) {
            return validationError({ idMaster: ["Id master tidak valid"] });
        }

        const deleted = await prisma.mst_checklist_staging.delete({
            where: { id: idMaster },
        });

        return NextResponse.json({
            success: true,
            message: "Checklist staging berhasil dihapus",
            data: serializeId(deleted),
        });
    } catch (error) {
        return serverError(error);
    }
}
