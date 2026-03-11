export type WarehouseTransferBody = {
    id_po?: string | number;
    id_customer?: string | number;
    jumlah?: string | number;
    sn_mesins?: string | string[];
    from_warehouse?: string | number;
    to_warehouse?: string | number;
    tgl_keluar?: string;
    tgl_masuk?: string;
    tgl_staging?: string;
    pic?: string | number;
};

export function normalizeSnMesins(value: unknown): string {
    if (Array.isArray(value)) return JSON.stringify(value);
    if (typeof value === "string") return value;
    if (value) return JSON.stringify(value);
    return "[]";
}

export function normalizeSnMesinsOptional(value: unknown): string | undefined {
    if (value === undefined) return undefined;
    return normalizeSnMesins(value);
}

export function parseSnMesins(value: string | null): string[] {
    if (!value) return [];
    try {
        const parsed = JSON.parse(value);
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
}
