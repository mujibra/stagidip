import { ValidationBag, mergeValidationBags, validatePositiveId } from "@/lib/http/validation";

export type PurchaseOrderCreateBody = {
    jumlah?: number | string;
    id_type_mesin?: number | string;
    model?: number | string;
    customer?: number | string;
    sn_mesins?: string;
    copy_from_id_po?: string | number | null;
    [k: string]: unknown;
};

export function cleanJsonString(value: string): string {
    return value.replace(/\\/g, "");
}

export function normalizeSnMesins(value: unknown): string | null {
    if (typeof value !== "string") return null;
    if (value === "[]") return null;
    return cleanJsonString(value);
}

export function normalizeCopyFromIdPo(value: unknown): number | null {
    if (value === "null" || value === null || value === undefined || value === "") return null;
    const parsed = Number(value);
    if (!Number.isFinite(parsed) || parsed < 1 || !Number.isInteger(parsed)) return null;
    return parsed;
}

export function validatePurchaseOrderCreatePayload(payload: PurchaseOrderCreateBody): ValidationBag {
    return mergeValidationBags(
        validatePositiveId(payload.jumlah, "jumlah", "jumlah is required"),
        validatePositiveId(payload.id_type_mesin, "id_type_mesin", "id_type_mesin is required"),
        validatePositiveId(payload.model, "model", "model is required")
    );
}
