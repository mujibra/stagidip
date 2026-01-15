import { parseRoles } from "../_shared/roles";

export function transformUser(row: any) {
    return {
        email: row.email,
        name: row.name,
        password: row.password,
        isActive: row.status === 1,
        customerLegacyId: row.id_customer,
        warehouseLegacyId: row.id_gudang,
        roles: parseRoles(row.roles),
    };
}
