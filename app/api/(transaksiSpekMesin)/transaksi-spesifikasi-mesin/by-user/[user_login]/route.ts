import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { serverError, validationError } from "@/lib/http/errorResponse";
import { toJsonSafe } from "@/lib/serialize";

function toInt(v: unknown): number | null {
    if (v === null || v === undefined || v === "") return null;
    const n = Number(v);
    return Number.isFinite(n) ? n : null;
}

function safeParseJsonArray(text: string | null): unknown[] {
    if (!text) return [];
    try {
        const parsed: unknown = JSON.parse(text);
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
}

type PublicUser = {
    id: string;
    name: string | null;
    email: string | null;
    roles: string | null;
    id_customer: number | null;
    id_gudang: number | null;
    status: number | null;
};

function toPublicUser(u: { id: bigint; name: string; email: string; roles: string | null; id_customer: number | null; id_gudang: number | null; status: number | null }): PublicUser {
    return {
        id: String(u.id),
        name: u.name ?? null,
        email: u.email ?? null,
        roles: u.roles ?? null,
        id_customer: u.id_customer ?? null,
        id_gudang: u.id_gudang ?? null,
        status: u.status ?? null,
    };
}

// Mirrors Laravel TransaksiSpesifikasiMesinController@index($user_login)
export async function GET(_req: Request, ctx: { params: Promise<{ user_login: string }> }) {
    try {
        const { user_login } = await ctx.params;
        const userIdNum = toInt(user_login);
        if (!userIdNum) return validationError({ user_login: ["Invalid user id"] });

        const user = await prisma.users.findFirst({
            where: { id: BigInt(userIdNum) },
            select: {
                id: true,
                roles: true,
                id_customer: true,
            },
        });

        if (!user) return NextResponse.json({ success: false, totalDatas: 0, data: [] });

        const isGuestBank = (user.roles ?? "") === "GUEST_BANK";

        const rows = await prisma.transaksi_spesifikasi_mesin.findMany({
            where: isGuestBank ? { customer: user.id_customer ?? -1 } : undefined,
            orderBy: { id: "desc" },
        });

        const enriched = await Promise.all(
            rows.map(async (r) => {
                const [detailPo, model, mesin, customer, picStaging, picTss, details] = await Promise.all([
                    r.id_po ? prisma.tbl_po.findFirst({ where: { id: r.id_po } }) : Promise.resolve(null),
                    prisma.models.findFirst({ where: { id: r.model } }),
                    prisma.mst_mesin.findFirst({ where: { id: r.id_type_mesin } }),
                    prisma.mst_customer.findFirst({ where: { id: r.customer } }),
                    r.approval_staging
                        ? prisma.users.findFirst({
                              where: { id: BigInt(r.approval_staging) },
                              select: {
                                  id: true,
                                  name: true,
                                  email: true,
                                  roles: true,
                                  id_customer: true,
                                  id_gudang: true,
                                  status: true,
                              },
                          })
                        : Promise.resolve(null),
                    r.approval_tss
                        ? prisma.users.findFirst({
                              where: { id: BigInt(r.approval_tss) },
                              select: {
                                  id: true,
                                  name: true,
                                  email: true,
                                  roles: true,
                                  id_customer: true,
                                  id_gudang: true,
                                  status: true,
                              },
                          })
                        : Promise.resolve(null),
                    prisma.transaksi_spesifikasi_mesin_dtl.findFirst({ where: { id_spek_mesin_hdr: r.id } }),
                ]);

                // Laravel mutates fields: sn_mesins decoded, attach relations, unset id_po/id_type_mesin.
                return {
                    id: r.id,
                    sn_mesins: safeParseJsonArray(r.sn_mesins),
                    model,
                    pn_system: r.pn_system,
                    customer,
                    notes: r.notes,
                    approval_staging: picStaging ? toPublicUser(picStaging) : null,
                    approval_tss: picTss ? toPublicUser(picTss) : null,
                    time_todo: r.time_todo,
                    created_at: r.created_at,
                    updated_at: r.updated_at,
                    detail_po: detailPo,
                    mesin,
                    details,
                };
            }),
        );

        return NextResponse.json({
            success: true,
            totalDatas: enriched.length,
            data: toJsonSafe(enriched),
        });
    } catch (e) {
        return serverError(e);
    }
}
