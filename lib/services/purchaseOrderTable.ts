import { prisma } from "@/lib/prisma";

export function toPositiveInt(value: string) {
    const num = Number(value);
    return Number.isInteger(num) && num > 0 ? num : null;
}

export function getPoTableName(idPo: number) {
    return `crt_${idPo}`;
}

export async function getTableColumns(tableName: string) {
    return prisma.$queryRawUnsafe<Array<{ COLUMN_NAME: string }>>(
        `
        SELECT COLUMN_NAME
        FROM information_schema.columns
        WHERE table_schema = DATABASE() AND table_name = ?
    `,
        tableName,
    );
}

export async function tableExists(tableName: string) {
    const rows = await prisma.$queryRawUnsafe<Array<{ total: number }>>(
        `
        SELECT COUNT(*) AS total
        FROM information_schema.tables
        WHERE table_schema = DATABASE() AND table_name = ?
    `,
        tableName,
    );

    return Number(rows[0]?.total ?? 0) > 0;
}

export function getMachineColumns(columnNames: string[]) {
    return columnNames.filter((column) => /_MESIN$/i.test(column) || column.toLowerCase() === "sn_mesin");
}
