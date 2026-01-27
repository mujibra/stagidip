import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { serverError } from "@/lib/http/errorResponse";
import { toJsonSafe } from "@/lib/serialize";

export const runtime = "nodejs";

function toNumber(value: string): number | null {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
}

function parseLabels(item: { types?: string | null; labels?: string | null }) {
    if (!item.types) return item.labels;
    if (item.types === "COMBO_BOX" || item.types === "TEXT_INPUT") {
        if (!item.labels) return item.labels;
        try {
            return JSON.parse(item.labels);
        } catch {
            return item.labels;
        }
    }
    return item.labels;
}

export async function GET(
    _req: NextRequest,
    context: { params: { idMesin: string; idDivisi: string } }
) {
    try {
        const idMesin = toNumber(context.params.idMesin);
        const idDivisi = toNumber(context.params.idDivisi);

        if (!idMesin || !idDivisi) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Data Not Found",
                    data: [],
                },
                { status: 400 }
            );
        }

        const divisi = await prisma.mst_divisi.findFirst({
            where: { id: idDivisi, id_mesin: idMesin },
        });

        if (!divisi) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Data Not Found",
                    data: [],
                },
                { status: 400 }
            );
        }

        const [mesin, checklist] = await Promise.all([
            prisma.mst_mesin.findFirst({ where: { id: divisi.id_mesin } }),
            prisma.mst_checklist_staging.findMany({
                where: { id_divisi: divisi.id },
                include: { mst_type_value_checklist: true },
                orderBy: { id: "asc" },
            }),
        ]);

        const checklistStaging = checklist.map((item) => ({
            ...item,
            item_type_values: item.mst_type_value_checklist
                ? {
                      ...item.mst_type_value_checklist,
                      labels: parseLabels(item.mst_type_value_checklist),
                  }
                : null,
        }));

        const data = {
            ...divisi,
            mesin: mesin ?? null,
            checklistStaging,
        };

        return NextResponse.json({
            success: true,
            data: toJsonSafe(data),
        });
    } catch (error) {
        return serverError(error);
    }
}
