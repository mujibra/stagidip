import { mergeValidationBags, validatePositiveId } from "@/lib/http/validation";
import type { ValidationBag } from "@/lib/http/validation";

export type StatusDeliveryBody = {
    id_po?: string | number;
    id_mesin?: string | number;
    sn_mesin?: string;
    tgl_perkiraan_tiba?: string;
    tgl_perkiraan_keluar?: string;
    notes?: string;
    obsolete?: string | null;
};

export function normalizeSnMesin(value: unknown): string {
    return typeof value === "string" ? value.trim() : "";
}

export function normalizeNullableText(value: unknown): string | null {
    if (value === null || value === undefined) return null;
    const text = String(value).trim();
    return text.length ? text : null;
}

export function validateStatusDeliveryPayload(payload: StatusDeliveryBody): ValidationBag {
    const snMesin = normalizeSnMesin(payload.sn_mesin);
    const snMesinErrors: ValidationBag = snMesin ? {} : { sn_mesin: ["SN Mesin wajib diisi"] };

    return mergeValidationBags(
        validatePositiveId(payload.id_po, "id_po", "PO wajib diisi"),
        validatePositiveId(payload.id_mesin, "id_mesin", "Mesin wajib diisi"),
        snMesinErrors
    );
}
