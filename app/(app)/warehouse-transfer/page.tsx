import CrudPage from "@/components/CrudPage";

export default function Page() {
  return (
    <CrudPage
      title="Warehouse Transfer"
      subtitle="Manage transfer records between warehouses and run parity checks for CRUD operations."
      endpoint="/api/warehouse-transfer"
      listEndpoint="/api/warehouse-transfer"
      idKey="id"
      fields={[
        { key: "id_po", label: "PO ID" },
        { key: "id_customer", label: "Customer ID" },
        { key: "jumlah", label: "Quantity" },
        { key: "sn_mesins", label: "SN Mesins (JSON)", type: "textarea" },
        { key: "from_warehouse", label: "From Warehouse" },
        { key: "to_warehouse", label: "To Warehouse" },
        { key: "tgl_keluar", label: "Tanggal Keluar" },
        { key: "tgl_masuk", label: "Tanggal Masuk" },
        { key: "tgl_staging", label: "Tanggal Staging" },
        { key: "pic", label: "PIC" },
      ]}
    />
  );
}
