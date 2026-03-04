import { ValidationBag } from "@/lib/http/validation";

export function parseNullableParam(value: string): string | null {
    return value === "null" ? null : value;
}

export function parseNullablePositiveIntParam(value: string, field: string): { value: number | null; errors: ValidationBag } {
    const raw = parseNullableParam(value);
    if (raw === null || raw === "") return { value: null, errors: {} };

    const parsed = Number(raw);
    if (!Number.isFinite(parsed) || parsed < 1 || !Number.isInteger(parsed)) {
        return { value: null, errors: { [field]: [`${field} tidak valid`] } };
    }

    return { value: parsed, errors: {} };
}

export function parseNullableDateRangeParam(value: string, field: string): {
    range: { start: Date; end: Date } | null;
    errors: ValidationBag;
} {
    const raw = parseNullableParam(value);
    if (!raw) return { range: null, errors: {} };

    const parsed = new Date(raw);
    if (Number.isNaN(parsed.getTime())) {
        return { range: null, errors: { [field]: [`${field} tidak valid`] } };
    }

    const start = new Date(parsed);
    start.setHours(0, 0, 0, 0);
    const end = new Date(start);
    end.setDate(end.getDate() + 1);

    return { range: { start, end }, errors: {} };
}
