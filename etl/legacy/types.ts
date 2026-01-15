export interface LegacyCustomer {
    id: number;
    bank_desc: string;
    address: string | null;
}

export interface LegacyWarehouse {
    id: number;
    gudang_desc: string;
    alamat: string | null;
}

export interface LegacyUser {
    id: number;
    name: string;
    email: string;
    status: number | null;
    id_customer: number | null;
    id_gudang: number | null;
}
