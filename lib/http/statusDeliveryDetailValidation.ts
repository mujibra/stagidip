import { mergeValidationBags, validatePositiveId } from "@/lib/http/validation";
import type { ValidationBag } from "@/lib/http/validation";

export type StatusDeliveryDetailBody = {
    id_header?: string | number;
    status?: string;
    keterangan?: string;
};

export function normalizeStatus(value: unknown): string {
    return typeof value === "string" ? value.trim() : "";
}

export function normalizeNullableText(value: unknown): string | null {
    if (value === null || value === undefined) return null;
    const text = String(value).trim();
    return text.length ? text : null;
}

export function validateStatusDeliveryDetailPayload(payload: StatusDeliveryDetailBody): ValidationBag {
    const status = normalizeStatus(payload.status);
    const statusErrors: ValidationBag = status ? {} : { status: ["Status wajib diisi"] };

    return mergeValidationBags(
        validatePositiveId(payload.id_header, "id_header", "Header wajib diisi"),
        statusErrors
    );
}
