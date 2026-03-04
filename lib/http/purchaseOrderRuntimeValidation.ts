import { ValidationBag, mergeValidationBags, validatePositiveId } from "@/lib/http/validation";

export type SnMesinItem = {
    idMesin: number;
    snMesin: string;
};

export function validateIdPoParam(idPo: unknown): ValidationBag {
    return validatePositiveId(idPo, "idPo", "idPo tidak valid");
}

export function validatePoMesinParams(idPo: unknown, idMesin: unknown): ValidationBag {
    return mergeValidationBags(
        validatePositiveId(idPo, "idPo", "idPo tidak valid"),
        validatePositiveId(idMesin, "idMesin", "idMesin tidak valid")
    );
}

export function normalizeNoteDescription(value: unknown): string {
    if (value === null || value === undefined) return "";
    return String(value).trim();
}

export function parseSnMesinItems(raw: string | null): SnMesinItem[] | null {
    if (!raw) return null;

    try {
        const parsed: unknown = JSON.parse(raw);
        if (!Array.isArray(parsed)) return null;

        const cleaned: SnMesinItem[] = [];
        for (const item of parsed) {
            if (typeof item !== "object" || item === null) continue;

            const idMesinRaw = (item as Record<string, unknown>)["idMesin"];
            const snMesinRaw = (item as Record<string, unknown>)["snMesin"];

            const idMesin = Number(idMesinRaw);
            const snMesin = typeof snMesinRaw === "string" ? snMesinRaw.trim() : "";

            if (Number.isFinite(idMesin) && idMesin > 0 && snMesin) {
                cleaned.push({ idMesin, snMesin });
            }
        }

        return cleaned.length ? cleaned : null;
    } catch {
        return null;
    }
}
