// etl/mappers/warehouse.mapper.ts
import { LegacyWarehouse } from "../legacy/types";

export function mapWarehouse(row: LegacyWarehouse) {
    return {
        code: row.gudang_desc.trim(),
        name: row.gudang_desc.trim(),
        address: row.alamat ?? null,
    };
}
