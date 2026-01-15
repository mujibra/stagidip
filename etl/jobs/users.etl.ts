// etl/jobs/users.etl.ts
import { legacyDb } from "../legacy/legacyClient";
import { RowDataPacket } from "mysql2";
import { prisma } from "@/lib/prisma";
import { mapUser } from "../mappers/user.mapper";
import { LegacyUser } from "../legacy/types";

export async function runUsersETL() {
    const [rows] = await legacyDb.query<(LegacyUser & RowDataPacket)[]>(`
    SELECT id, name, email, status, id_customer, id_gudang
    FROM users
    WHERE email IS NOT NULL
  `);

    console.log("Users found:", rows.length);

    for (const legacy of rows) {
        const mapped = mapUser(legacy);

        const customerId = mapped.customerLegacyId
            ? (
                  await prisma.legacyIdMap.findUnique({
                      where: {
                          legacyTable_legacyId: {
                              legacyTable: "mst_customer",
                              legacyId: mapped.customerLegacyId,
                          },
                      },
                  })
              )?.canonicalId ?? null
            : null;

        const warehouseId = mapped.warehouseLegacyId
            ? (
                  await prisma.legacyIdMap.findUnique({
                      where: {
                          legacyTable_legacyId: {
                              legacyTable: "mst_gudang",
                              legacyId: mapped.warehouseLegacyId,
                          },
                      },
                  })
              )?.canonicalId ?? null
            : null;

        const user = await prisma.user.upsert({
            where: { email: mapped.email },
            update: {
                name: mapped.name,
                isActive: mapped.isActive,
                customerId,
                warehouseId,
            },
            create: {
                name: mapped.name,
                email: mapped.email,
                isActive: mapped.isActive,
                customerId,
                warehouseId,
            },
        });

        await prisma.legacyIdMap.upsert({
            where: {
                legacyTable_legacyId: {
                    legacyTable: "users",
                    legacyId: legacy.id,
                },
            },
            update: {
                canonicalId: user.id,
            },
            create: {
                legacyTable: "users",
                legacyId: legacy.id,
                canonicalId: user.id,
            },
        });
    }

    const legacyCount = rows.length;
    const mappedCount = await prisma.legacyIdMap.count({
        where: { legacyTable: "users" },
    });

    if (legacyCount !== mappedCount) {
        throw new Error(`USERS ETL mismatch: legacy=${legacyCount}, mapped=${mappedCount}`);
    }

    console.log("USERS_ETL_PHASE1_STABLE");
}
