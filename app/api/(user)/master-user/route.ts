import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { serverError, validationError } from "@/lib/http/errorResponse";
import { toJsonSafe } from "@/lib/serialize";
import { getPagination } from "@/lib/http/pagination";
import { hasValidationErrors, mergeValidationBags } from "@/lib/http/validation";
import { parseUserRoleFilter, parseUserStatusFilter } from "@/lib/http/userQueryValidation";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
    try {
        const roleFilter = parseUserRoleFilter(req.nextUrl.searchParams.get("roles"));
        const statusFilter = parseUserStatusFilter(req.nextUrl.searchParams.get("status"));
        const errors = mergeValidationBags(roleFilter.errors, statusFilter.errors);

        if (hasValidationErrors(errors)) {
            return validationError(errors);
        }

        const q = req.nextUrl.searchParams.get("q")?.trim() ?? "";
        const { skip, take, page, perPage } = getPagination(req.nextUrl.searchParams, { defaultPerPage: 20 });

        const where: Record<string, unknown> = {};
        if (roleFilter.role) where.roles = roleFilter.role;
        if (statusFilter.status !== null) where.status = statusFilter.status;
        if (q) {
            where.OR = [
                { name: { contains: q } },
                { email: { contains: q } },
            ];
        }

        const [users, total] = await Promise.all([
            prisma.users.findMany({ where, orderBy: { id: "desc" }, skip, take }),
            prisma.users.count({ where }),
        ]);

        if (!users.length) {
            return NextResponse.json({ success: true, totalDatas: total, page, perPage, data: [] });
        }

        const customerIds = Array.from(
            new Set(users.map((u) => u.id_customer).filter((id): id is number => typeof id === "number"))
        );
        const gudangIds = Array.from(
            new Set(users.map((u) => u.id_gudang).filter((id): id is number => typeof id === "number"))
        );

        const [customers, gudangs] = await Promise.all([
            customerIds.length ? prisma.mst_customer.findMany({ where: { id: { in: customerIds } } }) : [],
            gudangIds.length ? prisma.mst_gudang.findMany({ where: { id: { in: gudangIds } } }) : [],
        ]);

        const customerMap = new Map(customers.map((c) => [c.id, c]));
        const gudangMap = new Map(gudangs.map((g) => [g.id, g]));

        const data = users.map((user) => {
            const safeUser = toJsonSafe(user);
            return {
                ...safeUser,
                customer: user.id_customer ? customerMap.get(user.id_customer) ?? null : null,
                gudang: user.id_gudang ? gudangMap.get(user.id_gudang) ?? null : null,
            };
        });

        return NextResponse.json({
            success: true,
            totalDatas: total,
            page,
            perPage,
            data: toJsonSafe(data),
        });
    } catch (error) {
        return serverError(error);
    }
}
