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
    context: { params: Promise<{ idMesin: string }> }
) {
    try {
        const idMesin = toNumber((await context.params).idMesin);
        if (!idMesin) {
            return NextResponse.json({
                success: true,
                data: [],
            });
        }

        const divisi = await prisma.mst_divisi.findMany({
            where: { id_mesin: idMesin },
            orderBy: { id: "asc" },
        });

        const divisiIds = divisi.map((item) => item.id);
        const checklist = divisiIds.length
            ? await prisma.mst_checklist_staging.findMany({
                  where: { id_divisi: { in: divisiIds } },
                  include: { mst_type_value_checklist: true },
                  orderBy: { id: "asc" },
              })
            : [];

        type ChecklistItem = (typeof checklist)[number];
        type ChecklistTypeValues =
            | (NonNullable<ChecklistItem["mst_type_value_checklist"]> & {
                  labels: ReturnType<typeof parseLabels>;
              })
            | null;
        type ChecklistWithTypeValues = ChecklistItem & {
            item_type_values: ChecklistTypeValues;
        };

        const checklistByDivisi = checklist.reduce((acc, item) => {
            const list = acc.get(item.id_divisi) ?? [];
            const typeValues: ChecklistTypeValues = item.mst_type_value_checklist
                ? {
                      ...item.mst_type_value_checklist,
                      labels: parseLabels(item.mst_type_value_checklist),
                  }
                : null;

            list.push({
                ...item,
                item_type_values: typeValues,
            } as ChecklistWithTypeValues);
            acc.set(item.id_divisi, list);
            return acc;
        }, new Map<number, ChecklistWithTypeValues[]>());

        const data = divisi.map((item) => ({
            ...item,
            checklistStaging: checklistByDivisi.get(item.id) ?? [],
        }));

        return NextResponse.json({
            success: true,
            data: toJsonSafe(data),
        });
    } catch (error) {
        return serverError(error);
    }
}
