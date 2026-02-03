import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { parseBody } from "@/lib/parseBody";
import { validationError, serverError } from "@/lib/http/errorResponse";
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
        const idMesin = Number((await ctx.params).idMesin);
        const body = await parseBody<CopyTemplateBody>(req);
        const copyFromModel = Number(body.copy_from_model);

        if (!copyFromModel) {
            return validationError({ copy_from_model: ["copy_from_model wajib diisi"] });
        }

        const mesinExists = await prisma.mst_mesin.findUnique({ where: { id: idMesin }, select: { id: true } });
        if (!mesinExists) {
            return NextResponse.json({ success: false, message: "Mesin tidak ditemukan" }, { status: 400 });
        }

        const oldDivisi = await prisma.mst_divisi.findMany({ where: { id_mesin: copyFromModel } });
        if (!oldDivisi.length) {
            return NextResponse.json({ success: false, message: "Tidak ada template divisi untuk disalin" }, { status: 400 });
        }

        await prisma.mst_divisi.createMany({
            data: oldDivisi.map((d) => ({ name: d.name, id_mesin: idMesin })),
        });

        const newDivisi = await prisma.mst_divisi.findMany({ where: { id_mesin: idMesin } });
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
                    id_mesin: idMesin,
                    id_type_values: c.id_type_values,
                };
            })
            .filter((x): x is NonNullable<typeof x> => Boolean(x));

        if (dataItems.length > 0) {
            await prisma.mst_checklist_staging.createMany({ data: dataItems });
            await prisma.mst_mesin.update({
                where: { id: idMesin },
                data: { status_template_prestaging: 1, copy_from_model: copyFromModel },
            });
        }

        return NextResponse.json({ success: true, message: "Copy Template Prestaging berhasil" });
    } catch (error) {
        return serverError(error);
    }
}
