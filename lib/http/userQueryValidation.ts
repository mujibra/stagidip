import { ValidationBag, hasValidationErrors, mergeValidationBags, validatePositiveId } from "@/lib/http/validation";

const picApprovalRoleByType: Record<string, string> = {
    DIP: "OPERATOR_DIP",
    TSS: "OPERATOR_TSS",
    MOVER: "OPERATOR_MOVER",
};

const picMitraRoleByType: Record<string, string> = {
    TSS: "OPERATOR_TSS",
    STAGING: "OPERATOR_DIP",
    MOVER: "OPERATOR_MOVER",
};

export function resolvePicApprovalRole(type: unknown): { role: string | null; errors: ValidationBag } {
    const normalized = typeof type === "string" ? type.trim().toUpperCase() : "";
    if (!normalized) return { role: null, errors: { type: ["type wajib diisi"] } };
    const role = picApprovalRoleByType[normalized];
    if (!role) {
        return { role: null, errors: { type: ["type tidak valid"] } };
    }
    return { role, errors: {} };
}

export function resolvePicMitraRole(type: unknown): { role: string | null; errors: ValidationBag } {
    const normalized = typeof type === "string" ? type.trim().toUpperCase() : "";
    if (!normalized) return { role: null, errors: { type: ["type wajib diisi"] } };
    const role = picMitraRoleByType[normalized];
    if (!role) {
        return { role: null, errors: { type: ["type tidak valid"] } };
    }
    return { role, errors: {} };
}

export function validateUserLoginParam(value: unknown): ValidationBag {
    return validatePositiveId(value, "id_user_login", "id_user_login tidak valid");
}

export function parseUserStatusFilter(value: string | null): { status: number | null; errors: ValidationBag } {
    if (value === null || value === "") return { status: null, errors: {} };
    if (value !== "0" && value !== "1") {
        return { status: null, errors: { status: ["status filter tidak valid"] } };
    }
    return { status: Number(value), errors: {} };
}

export function parseUserRoleFilter(value: string | null): { role: string | null; errors: ValidationBag } {
    if (value === null || value.trim() === "") return { role: null, errors: {} };
    const role = value.trim().toUpperCase();
    const allowed = new Set(["SUPER_ADMIN", "ADMIN", "SUPERVISOR", "OPERATOR_DIP", "OPERATOR_TSS", "OPERATOR_MOVER", "GUEST_BANK"]);
    if (!allowed.has(role)) {
        return { role: null, errors: { roles: ["roles filter tidak valid"] } };
    }
    return { role, errors: {} };
}

export function hasErrors(...bags: ValidationBag[]): boolean {
    return hasValidationErrors(mergeValidationBags(...bags));
}

export function mergeErrors(...bags: ValidationBag[]): ValidationBag {
    return mergeValidationBags(...bags);
}
