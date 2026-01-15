// etl/jobs/warehouses.etl.ts
import { legacyDb } from "../legacy/legacyClient";
import { RowDataPacket } from "mysql2";
import { prisma } from "@/lib/prisma";
import { mapWarehouse } from "../mappers/warehouse.mapper";
import { LegacyWarehouse } from "../legacy/types";

export async function runWarehousesETL() {
    const [rows] = await legacyDb.query<(LegacyWarehouse & RowDataPacket)[]>(`
    SELECT id, gudang_desc, alamat
    FROM mst_gudang
  `);

    console.log("Warehouses found:", rows.length);

    for (const legacy of rows) {
        const mapped = mapWarehouse(legacy);

        const existing = await prisma.warehouse.findFirst({
            where: { code: mapped.code },
        });

        const warehouse = existing
            ? existing
            : await prisma.warehouse.create({
                  data: mapped,
              });

        await prisma.legacyIdMap.upsert({
            where: {
                legacyTable_legacyId: {
                    legacyTable: "mst_gudang",
                    legacyId: legacy.id,
                },
            },
            update: {
                canonicalId: warehouse.id,
            },
            create: {
                legacyTable: "mst_gudang",
                legacyId: legacy.id,
                canonicalId: warehouse.id,
            },
        });
    }

    const legacyCount = rows.length;
    const mappedCount = await prisma.legacyIdMap.count({
        where: { legacyTable: "mst_gudang" },
    });

    if (legacyCount !== mappedCount) {
        throw new Error(`WAREHOUSE ETL mismatch: legacy=${legacyCount}, mapped=${mappedCount}`);
    }

    console.log("WAREHOUSE_ETL_PHASE1_STABLE");
}
