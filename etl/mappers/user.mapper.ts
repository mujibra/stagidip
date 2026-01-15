// etl/mappers/user.mapper.ts
import { LegacyUser } from "../legacy/types";

export function mapUser(row: LegacyUser) {
    return {
        name: row.name.trim(),
        email: row.email.toLowerCase().trim(),
        isActive: row.status === 1,
        customerLegacyId: row.id_customer,
        warehouseLegacyId: row.id_gudang,
    };
}
