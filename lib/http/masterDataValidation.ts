import { ValidationBag, validatePositiveId } from "@/lib/http/validation";

export function validateMasterIdParam(id: unknown): ValidationBag {
    return validatePositiveId(id, "id", "id tidak valid");
}

export function validateRequiredName(name: unknown, field = "name", message = "Nama tidak boleh kosong"): ValidationBag {
    const normalized = typeof name === "string" ? name.trim() : "";
    return normalized ? {} : { [field]: [message] };
}

export function validateRequiredArray(value: unknown, field: string, message: string): ValidationBag {
    return Array.isArray(value) && value.length > 0 ? {} : { [field]: [message] };
}
