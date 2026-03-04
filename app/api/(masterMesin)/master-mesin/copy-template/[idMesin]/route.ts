import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { parseBody } from "@/lib/parseBody";
import { badRequestError, notFoundError, serverError, validationError } from "@/lib/http/errorResponse";
import { hasValidationErrors, mergeValidationBags, toNumber, validatePositiveId } from "@/lib/http/validation";
import { validateMasterIdParam } from "@/lib/http/masterDataValidation";

export const runtime = "nodejs";

type CopyTemplateBody = {
    copy_from_model?: number;
};

function mapDivisi(oldIds: number[], newIds: number[]) {
    const mapping: { id_divisi_from: number; id_divisi_to: number }[] = [];
    const uniqueOld = Array.from(new Set(oldIds));
    const uniqueNew = Array.from(new Set(newIds));

    for (let i = 0; i < uniqueOld.length; i++) {
        mapping.push({ id_divisi_from: uniqueOld[i], id_divisi_to: uniqueNew[i] });
    }

    return mapping;
}

function findDivisiTo(oldId: number, mapping: { id_divisi_from: number; id_divisi_to: number }[]): number | null {
    const found = mapping.find((m) => m.id_divisi_from === oldId);
    return found ? found.id_divisi_to : null;
}

export async function POST(req: NextRequest, ctx: { params: Promise<{ idMesin: string }> }) {
    try {
        const { idMesin } = await ctx.params;
        const body = await parseBody<CopyTemplateBody>(req);

        const errors = mergeValidationBags(
            validateMasterIdParam(idMesin),
            validatePositiveId(body.copy_from_model, "copy_from_model", "copy_from_model wajib diisi")
        );
        if (hasValidationErrors(errors)) return validationError(errors);

        const idMesinNum = toNumber(idMesin)!;
        const copyFromModel = toNumber(body.copy_from_model)!;

        const mesinExists = await prisma.mst_mesin.findUnique({ where: { id: idMesinNum }, select: { id: true } });
        if (!mesinExists) return notFoundError("Mesin tidak ditemukan");

        const oldDivisi = await prisma.mst_divisi.findMany({ where: { id_mesin: copyFromModel } });
        if (!oldDivisi.length) return badRequestError("Tidak ada template divisi untuk disalin");

        await prisma.mst_divisi.createMany({ data: oldDivisi.map((d) => ({ name: d.name, id_mesin: idMesinNum })) });

        const newDivisi = await prisma.mst_divisi.findMany({ where: { id_mesin: idMesinNum } });
        const divisiMapping = mapDivisi(
            oldDivisi.map((d) => d.id),
            newDivisi.map((d) => d.id)
        );

        const oldChecklist = await prisma.mst_checklist_staging.findMany({ where: { id_mesin: copyFromModel } });

        const dataItems = oldChecklist
            .map((c) => {
                const targetDivisiId = findDivisiTo(Number(c.id_divisi), divisiMapping);
                if (!targetDivisiId) return null;

                return {
                    test_desc: c.test_desc,
                    result_detail: c.result_detail,
                    id_divisi: targetDivisiId,
                    id_mesin: idMesinNum,
                    id_type_values: c.id_type_values,
                };
            })
            .filter((x): x is NonNullable<typeof x> => Boolean(x));

        if (dataItems.length > 0) {
            await prisma.mst_checklist_staging.createMany({ data: dataItems });
            await prisma.mst_mesin.update({
                where: { id: idMesinNum },
                data: { status_template_prestaging: 1, copy_from_model: copyFromModel },
            });
        }

        return NextResponse.json({ success: true, message: "Copy Template Prestaging berhasil" });
    } catch (error) {
        return serverError(error);
    }
}
