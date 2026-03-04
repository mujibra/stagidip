import { ValidationBag, hasValidationErrors, mergeValidationBags, validatePositiveId } from "@/lib/http/validation";

export type UpdateUserBody = {
    name?: string;
    email?: string;
    password?: string;
    roles?: string;
    id_customer?: number | string | null;
    id_gudang?: number | string | null;
    status?: number | string | null;
};

export function toBigIntId(value: unknown): bigint | null {
    if (value === null || value === undefined || value === "") return null;
    const parsed = Number(value);
    if (!Number.isFinite(parsed) || parsed < 1 || !Number.isInteger(parsed)) return null;
    return BigInt(parsed);
}

export function toNullableInt(value: unknown): number | null {
    if (value === null || value === undefined || value === "") return null;
    const parsed = Number(value);
    if (!Number.isFinite(parsed) || !Number.isInteger(parsed)) return null;
    return parsed;
}

export function validateUserRouteParams(id: unknown, userLogin: unknown): ValidationBag {
    return mergeValidationBags(
        validatePositiveId(id, "id", "Invalid user id"),
        validatePositiveId(userLogin, "user_login", "Invalid user login id")
    );
}

export function validateUpdateUserPayload(body: UpdateUserBody): ValidationBag {
    const role = typeof body.roles === "string" ? body.roles.trim() : "";
    const roleErrors = role ? {} : { roles: ["Roles wajib dipilih"] };
    return mergeValidationBags(roleErrors);
}

export function hasAnyErrors(errors: ValidationBag): boolean {
    return hasValidationErrors(errors);
}
