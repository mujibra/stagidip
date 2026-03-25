export function toPositiveInt(value: string) {
    const num = Number(value);
    return Number.isInteger(num) && num > 0 ? num : null;
}

export function isIsoDate(value: string) {
    return /^\d{4}-\d{2}-\d{2}$/.test(value);
}

export function toDateRange(dateFrom: string, dateTo: string) {
    return {
        gte: new Date(`${dateFrom}T00:00:00.000Z`),
        lte: new Date(`${dateTo}T23:59:59.999Z`),
    };
}
