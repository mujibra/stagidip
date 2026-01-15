/* eslint-disable @typescript-eslint/no-explicit-any */

import { legacyDb } from "../legacy/legacyClient";
import { mapCustomer } from "../mappers/customer.mapper";
import { RowDataPacket } from "mysql2";
import { prisma } from "@/lib/prisma";
import { LegacyCustomer } from "../legacy/types";

export async function runCustomersETL() {
    const [rows] = await legacyDb.query<(LegacyCustomer & RowDataPacket)[]>(`
    SELECT id, bank_desc, address
    FROM mst_customer
  `);

    console.log("Customers found:", rows.length);

    for (const legacyCustomer of rows) {
        const mapped = mapCustomer(legacyCustomer);

        const existing = await prisma.customer.findFirst({
            where: { name: mapped.name },
        });

        const customer = existing
            ? existing
            : await prisma.customer.create({
                  data: {
                      name: mapped.name,
                      address: mapped.address,
                  },
              });

        await prisma.legacyIdMap.upsert({
            where: {
                legacyTable_legacyId: {
                    legacyTable: "mst_customer",
                    legacyId: legacyCustomer.id,
                },
            },
            update: {
                canonicalId: customer.id,
            },
            create: {
                legacyTable: "mst_customer",
                legacyId: legacyCustomer.id,
                canonicalId: customer.id,
            },
        });
    }

    const legacyCount = rows.length;
    const mappedCount = await prisma.legacyIdMap.count({
        where: { legacyTable: "mst_customer" },
    });

    if (legacyCount !== mappedCount) {
        throw new Error(`Customer ETL mismatch: legacy=${legacyCount}, mapped=${mappedCount}`);
    }

    console.log("CUSTOMERS ETL LOCKED");
}
