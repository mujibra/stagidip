import CrudPage from "@/components/CrudPage";

export default function Page() {
  return (
    <CrudPage
      title="Summary Warehouse Transfer"
      subtitle="Warehouse transfer summary insights."
      endpoint="/api/warehouse-transfer"
      fields={[
        { key: "id_po", label: "PO ID" },
        { key: "id_customer", label: "Customer ID" },
        { key: "jumlah", label: "Quantity" },
        { key: "from_warehouse", label: "From Warehouse" },
        { key: "to_warehouse", label: "To Warehouse" },
        { key: "tgl_keluar", label: "Tanggal Keluar" },
        { key: "tgl_masuk", label: "Tanggal Masuk" },
        { key: "tgl_staging", label: "Tanggal Staging" },
      ]}
      allowCreate={false}
      allowEdit={false}
      allowDelete={false}
    />
  );
}
