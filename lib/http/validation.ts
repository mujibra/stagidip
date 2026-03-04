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

export function isPrismaNotFoundError(error: unknown): boolean {
    return (
        typeof error === "object" &&
        error !== null &&
        "code" in error &&
        (error as { code?: string }).code === "P2025"
    );
}
