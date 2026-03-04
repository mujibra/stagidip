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

export type ValidationBag = Record<string, string[]>;

export function toNumber(value: unknown): number | null {
    if (value === null || value === undefined || value === "") return null;
    const num = Number(value);
    return Number.isFinite(num) ? num : null;
}

export function toDate(value: unknown): Date | null {
    if (!value) return null;
    const date = new Date(String(value));
    return Number.isNaN(date.getTime()) ? null : date;
}

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

export function validatePositiveId(value: unknown, field: string, message: string): ValidationBag {
    const parsed = toNumber(value);
    if (!parsed || parsed < 1 || !Number.isInteger(parsed)) {
        return { [field]: [message] };
    }
    return {};
}

export function mergeValidationBags(...bags: ValidationBag[]): ValidationBag {
    const result: ValidationBag = {};
    for (const bag of bags) {
        for (const [field, entries] of Object.entries(bag)) {
            if (!entries.length) continue;
            if (!result[field]) result[field] = [];
            result[field].push(...entries);
        }
    }
    return result;
}

export function hasValidationErrors(errors: ValidationBag): boolean {
    return Object.values(errors).some((entries) => entries.length > 0);
}
