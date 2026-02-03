import CrudPage from "@/components/CrudPage";

export default function Page() {
  return (
    <CrudPage
      title="Warehouse Transfer"
      subtitle="Manage warehouse transfer operations."
      endpoint="/api/warehouse-transfer"
      fields={[
        { key: "id_po", label: "PO ID" },
        { key: "id_customer", label: "Customer ID" },
        { key: "jumlah", label: "Quantity" },
        { key: "sn_mesins", label: "SN Mesins" },
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
