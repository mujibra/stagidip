function parseRoles(value: unknown): string[] {
    if (Array.isArray(value)) return value.map((entry) => String(entry).trim()).filter(Boolean);
    if (typeof value === "string") return value.split(",").map((entry) => entry.trim()).filter(Boolean);
    if (value == null) return [];
    return [String(value).trim()].filter(Boolean);
}

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
