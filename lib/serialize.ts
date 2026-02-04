export type WithId = { id?: unknown };

export function serializeId<T extends WithId & Record<string, unknown>>(row: T): T {
    if (row && row.id !== undefined && row.id !== null) {
        return { ...row, id: String(row.id) } as T;
    }
    return row;
}

export function serializeMany<T extends WithId & Record<string, unknown>>(rows: T[]): T[] {
    return rows.map(serializeId);
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
    return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function toJsonSafe<T>(value: T): T {
    const seen = new WeakSet<object>();

    const walk = (v: unknown): unknown => {
        if (typeof v === "bigint") return v.toString();
        if (v === null || v === undefined) return v;
        if (v instanceof Date) {
            const time = v.getTime();
            return Number.isNaN(time) ? null : v.toISOString();
        }
        if (typeof v !== "object") return v;

        if (seen.has(v)) return v;
        seen.add(v);

        if (Array.isArray(v)) return v.map(walk);

        if (isPlainObject(v)) {
            const out: Record<string, unknown> = {};
            for (const [k, val] of Object.entries(v)) out[k] = walk(val);
            return out;
        }

        return v;
    };

    return walk(value) as T;
}
