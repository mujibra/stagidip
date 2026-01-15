export function transformCustomers(rows: any[]) {
    return rows.map((row) => ({
        code: String(row.id),
        name: row.bank_desc?.trim(),
        address: row.address || null,
    }));
}
