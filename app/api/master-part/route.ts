import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@/app/generated/prisma";
import { prisma } from "@/lib/prisma";
import { parseBody } from "@/lib/parseBody";
import { validationError, serverError } from "@/lib/http/errorResponse";
import { serializeId, serializeMany } from "@/lib/serialize";
import { getPagination } from "@/lib/http/pagination";

export const runtime = "nodejs";

function toIntOrNull(v: string | null): number | null {
    if (!v) return null;
    const n = Number(v);
    return Number.isFinite(n) ? n : null;
}

function isNonTrivialSearch(s: string): boolean {
    return s.trim().length >= 3;
}

function mapStatusFromSearch(search: string): 1 | 0 | null {
    const s = search.toLowerCase();
    if (s.includes("active")) return 1;
    if (s.includes("inactive")) return 0;
    return null;
}

function sanitizePartColumn(desc: string): string {
    // Laravel: preg_replace('/[^a-zA-Z0-9_.]/', '_', part_desc)
    return desc.replace(/[^a-zA-Z0-9_.]/g, "_");
}

function randomString(len: number): string {
    const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let out = "";
    for (let i = 0; i < len; i++) {
        out += chars[Math.floor(Math.random() * chars.length)];
    }
    return out;
}

async function resolveMesinIdsFromSearch(search: string): Promise<number[]> {
    const trimmed = search.trim();
    const n = Number(trimmed);
    const isNumeric = Number.isFinite(n);

    const mesinWhere: Prisma.mst_mesinWhereInput = {
        OR: [{ type: { contains: trimmed } }, ...(isNumeric ? [{ id: n }] : [])],
    };

    const mesin = await prisma.mst_mesin.findMany({
        where: mesinWhere,
        select: { id: true },
    });

    return mesin.map((m) => m.id);
}

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);

        const mesinIdParam = searchParams.get("mesinId");
        const statusParam = searchParams.get("status"); // ACTIVE/INACTIVE
        const typeParam = searchParams.get("type"); // MESIN/PART_MESIN
        const search = (searchParams.get("search") ?? "").trim();

        const { skip, take } = getPagination(searchParams);

        const mesinId = toIntOrNull(mesinIdParam);

        // Base filter (your existing behavior)
        const baseWhere: Prisma.mst_part_numberWhereInput = {};
        if (mesinId !== null) baseWhere.id_mesin = mesinId;
        if (typeParam) baseWhere.types = typeParam;
        if (statusParam) baseWhere.status = statusParam === "ACTIVE" ? 1 : 0;

        // Laravel indexPaging behavior:
        // - search may match mesin.type or mesin.id, then filter parts by id_mesin IN those ids
        // - else search matches part columns
        // - also search "Active/Inactive" maps to status filter when search >= 3
        let where: Prisma.mst_part_numberWhereInput = { ...baseWhere };

        if (search.length > 0) {
            const statusFromText = isNonTrivialSearch(search) ? mapStatusFromSearch(search) : null;

            const mesinIds = await resolveMesinIdsFromSearch(search);

            if (mesinIds.length > 0) {
                where = {
                    ...where,
                    id_mesin: { in: mesinIds },
                };
            } else if (statusFromText !== null) {
                where = {
                    ...where,
                    status: statusFromText,
                };
            } else {
                // Laravel columns: part_no, part_desc, part_column, types, status, format
                // status here is numeric, so we don't do contains on it
                where = {
                    ...where,
                    OR: [
                        { part_no: { contains: search } },
                        { part_desc: { contains: search } },
                        { part_column: { contains: search } },
                        { types: { contains: search } },
                        { format: { contains: search } },
                    ],
                };
            }
        }

        const [data, total] = await Promise.all([
            prisma.mst_part_number.findMany({
                where,
                skip,
                take,
                orderBy: [{ id_mesin: "asc" }, { format: "desc" }, { position: "asc" }],
            }),
            prisma.mst_part_number.count({ where }),
        ]);

        return NextResponse.json({
            success: true,
            totalDatas: total,
            data: serializeMany(data),
        });
    } catch (error) {
        return serverError(error);
    }
}

type CreatePartDTO = {
    id_mesin: number;
    part_no?: string;
    part_desc?: string;
    status: number;
    types: "MESIN" | "PART_MESIN";
    format?: string;
    position?: number;
};

function mapMesinPartColumn(modelName: string): string {
    if (["ATM", "ATMS", "TTW"].includes(modelName)) return "ATM_MESIN";
    if (["CRM", "CRMS"].includes(modelName)) return "CRM_MESIN";
    if (["TCR"].includes(modelName)) return "TCR_MESIN";
    if (["CS KIOS"].includes(modelName)) return "CS_KIOS_MESIN";
    if (["VBK"].includes(modelName)) return "VBK_MESIN";
    return "NEW_MESIN";
}

export async function POST(req: NextRequest) {
    try {
        const body = await parseBody<CreatePartDTO>(req);

        const errors: Record<string, string[]> = {};
        if (!body.id_mesin) errors.id_mesin = ["Type Mesin Wajib dipilih"];
        if (body.status === undefined) errors.status = ["Status Wajib dipilih"];
        if (!body.types) errors.types = ["Type wajib diisi"];
        if (Object.keys(errors).length) return validationError(errors);

        // Laravel store behavior
        if (body.types === "MESIN") {
            // Determine part_column based on machine's model name
            const mesin = await prisma.mst_mesin.findUnique({
                where: { id: body.id_mesin },
                select: { model: true, type: true },
            });

            if (!mesin) {
                return NextResponse.json({ success: false, message: "Mesin tidak ditemukan" }, { status: 400 });
            }

            const modelRow = await prisma.models.findUnique({
                where: { id: mesin.model ?? 0 },
                select: { name: true },
            });

            const modelName = modelRow?.name ?? "";
            const partColumn = mapMesinPartColumn(modelName);

            // Only 1 active for this mesin + part_column
            if (body.status === 1) {
                const activeExists = await prisma.mst_part_number.findFirst({
                    where: {
                        id_mesin: body.id_mesin,
                        part_column: partColumn,
                        status: 1,
                    },
                    select: { id: true },
                });

                if (activeExists) {
                    return NextResponse.json(
                        {
                            success: false,
                            message: `PartNumber Mesin dengan Type ${mesin.type} hanya boleh 1 yang aktif.`,
                        },
                        { status: 400 },
                    );
                }
            }

            const created = await prisma.mst_part_number.create({
                data: {
                    ...body,
                    part_column: partColumn,
                },
            });

            return NextResponse.json({
                success: true,
                message: `Part Number ${created.part_no ?? ""} - ${created.part_desc ?? ""} created successfully.`,
                data: serializeId(created),
            });
        }

        // PART_MESIN: auto-generate unique part_column from part_desc
        const baseDesc = body.part_desc ?? "";
        const baseColumn = sanitizePartColumn(baseDesc);

        let partColumn = baseColumn;

        const exists1 = await prisma.mst_part_number.findFirst({
            where: { id_mesin: body.id_mesin, part_column: partColumn },
            select: { id: true },
        });

        if (exists1) partColumn = `${baseColumn}_${randomString(4)}`;

        const exists2 = await prisma.mst_part_number.findFirst({
            where: { id_mesin: body.id_mesin, part_column: partColumn },
            select: { id: true },
        });

        if (exists2) partColumn = `${baseColumn}_${randomString(5)}`;

        const created = await prisma.mst_part_number.create({
            data: {
                ...body,
                part_column: partColumn,
            },
        });

        return NextResponse.json({
            success: true,
            message: `Part Number ${created.part_no ?? ""} - ${created.part_desc ?? ""} created successfully.`,
            data: serializeId(created),
        });
    } catch (error) {
        return serverError(error);
    }
}
