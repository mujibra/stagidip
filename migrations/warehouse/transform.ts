export function transformWarehouses(rows: any[]) {
    return rows.map((row) => ({
        code: String(row.id),
        name: row.gudang_desc?.trim(),
        address: row.alamat || null,
    }));
}
