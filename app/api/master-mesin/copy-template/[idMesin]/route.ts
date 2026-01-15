import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { parseBody } from "@/lib/parseBody";

type RouteParams = {
    params: Promise<{ idMesin: string }>;
};

type CopyTemplateBody = {
    copy_from_model: number;
};

function mapDivisi(oldIds: number[], newIds: number[]) {
    const mapping: { id_divisi_from: number; id_divisi_to: number }[] = [];
    const uniqueOld = Array.from(new Set(oldIds));
    const uniqueNew = Array.from(new Set(newIds));

    for (let i = 0; i < uniqueOld.length; i++) {
        mapping.push({
            id_divisi_from: uniqueOld[i],
            id_divisi_to: uniqueNew[i],
        });
    }

    return mapping;
}

function findDivisiTo(oldId: number, mapping: { id_divisi_from: number; id_divisi_to: number }[]): number | null {
    const found = mapping.find((m) => m.id_divisi_from === oldId);
    return found ? found.id_divisi_to : null;
}

// POST /api/master-mesin/copy-template/:idMesin
export async function POST(req: NextRequest, { params }: RouteParams) {
    const { idMesin } = await params;
    const numericIdMesin = Number(idMesin);

    const body = await parseBody<CopyTemplateBody>(req);
    const copyFromModel = Number(body.copy_from_model);

    const mesinExists = await prisma.mst_mesin.findUnique({
        where: { id: numericIdMesin },
    });

    if (!mesinExists) {
        return NextResponse.json(
            {
                success: false,
                message: "Mesin tidak ditemukan",
            },
            { status: 400 }
        );
    }

    // ambil format divisi lama
    const oldDivisi = await prisma.mst_divisi.findMany({
        where: { id_mesin: copyFromModel },
    });

    if (!oldDivisi.length) {
        return NextResponse.json(
            {
                success: false,
                message: "Tidak ada template divisi untuk disalin",
            },
            { status: 400 }
        );
    }

    // insert divisi baru
    const dataInsertDivisiBaru = oldDivisi.map((d) => ({
        name: d.name,
        id_mesin: numericIdMesin,
    }));

    await prisma.mst_divisi.createMany({
        data: dataInsertDivisiBaru,
    });

    const newDivisi = await prisma.mst_divisi.findMany({
        where: { id_mesin: numericIdMesin },
    });

    const oldIds = oldDivisi.map((d) => d.id);
    const newIds = newDivisi.map((d) => d.id);

    const divisiMapping = mapDivisi(oldIds, newIds);

    // copy mst_checklist_staging
    const oldChecklist = await prisma.mst_checklist_staging.findMany({
        where: { id_mesin: copyFromModel },
    });

    const dataItems = oldChecklist
        .map((c) => {
            const targetDivisiId = findDivisiTo(c.id_divisi as number, divisiMapping);

            if (!targetDivisiId) return null;

            return {
                test_desc: c.test_desc,
                result_detail: c.result_detail,
                id_divisi: targetDivisiId,
                id_mesin: numericIdMesin,
                id_type_values: c.id_type_values,
            };
        })
        .filter(Boolean) as {
        test_desc: string;
        result_detail: string;
        id_divisi: number;
        id_mesin: number;
        id_type_values: number | null;
    }[];

    if (dataItems.length > 0) {
        await prisma.mst_checklist_staging.createMany({
            data: dataItems,
        });

        await prisma.mst_mesin.update({
            where: { id: numericIdMesin },
            data: {
                status_template_prestaging: 1,
                copy_from_model: copyFromModel,
            },
        });
    }

    return NextResponse.json({
        success: true,
        message: "Copy Template Prestaging berhasil",
    });
}
