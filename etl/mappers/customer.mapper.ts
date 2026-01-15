export type LegacyCustomer = {
    id: number;
    bank_desc: string;
    address: string | null;
};

export type CanonicalCustomer = {
    name: string;
    address?: string;
};

export function mapCustomer(legacy: LegacyCustomer): CanonicalCustomer {
    return {
        name: legacy.bank_desc.trim(),
        address: legacy.address ?? undefined,
    };
}
