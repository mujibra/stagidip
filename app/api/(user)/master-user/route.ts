import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { serverError } from "@/lib/http/errorResponse";
import { toJsonSafe } from "@/lib/serialize";

export const runtime = "nodejs";

export async function GET() {
    try {
        const users = await prisma.users.findMany();

        if (!users.length) {
            return NextResponse.json({ success: true, data: [] });
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
            data: toJsonSafe(data),
        });
    } catch (error) {
        return serverError(error);
    }
}
