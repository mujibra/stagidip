export const DEFAULT_CUSTOMER_LIMIT = 8;
export const CUSTOMER_LIMIT_OPTIONS = [5, 8, 10, 15] as const;

export const DEFAULT_IMPL_PAGE_SIZE = 20;
export const IMPLEMENTATION_PAGE_SIZE_OPTIONS = [10, 20, 50] as const;

export function resolveCustomerLimit(raw: string | null) {
    const parsed = Number(raw ?? DEFAULT_CUSTOMER_LIMIT);
    if (!Number.isFinite(parsed)) return DEFAULT_CUSTOMER_LIMIT;

    const value = Math.floor(parsed);
    return CUSTOMER_LIMIT_OPTIONS.includes(value as (typeof CUSTOMER_LIMIT_OPTIONS)[number])
        ? value
        : DEFAULT_CUSTOMER_LIMIT;
}

export function resolveImplPageSize(raw: string | null) {
    const parsed = Number(raw ?? DEFAULT_IMPL_PAGE_SIZE);
    if (!Number.isFinite(parsed)) return DEFAULT_IMPL_PAGE_SIZE;

    const value = Math.floor(parsed);
    return IMPLEMENTATION_PAGE_SIZE_OPTIONS.includes(value as (typeof IMPLEMENTATION_PAGE_SIZE_OPTIONS)[number])
        ? value
        : DEFAULT_IMPL_PAGE_SIZE;
}

export function resolvePositivePage(raw: string | null, fallback = 1) {
    const parsed = Number(raw ?? fallback);
    if (!Number.isFinite(parsed)) return fallback;

    const value = Math.floor(parsed);
    return value > 0 ? value : fallback;
}

export function resolveRecentYear(raw: string | null, nowYear: number, lookbackYears = 5) {
    const parsed = Number(raw ?? nowYear);
    if (!Number.isFinite(parsed)) return nowYear;

    const value = Math.floor(parsed);
    return value >= nowYear - lookbackYears && value <= nowYear ? value : nowYear;
}

export function resolveMonth(raw: string | null, fallbackMonth: number) {
    const parsed = Number(raw ?? fallbackMonth);
    if (!Number.isFinite(parsed)) return fallbackMonth;

    const value = Math.floor(parsed);
    return value >= 1 && value <= 12 ? value : fallbackMonth;
}
