import CrudPage from "@/components/CrudPage";

export default function Page() {
  return (
    <CrudPage
      title="Purchase Order"
      subtitle="Review and manage purchase order records."
      endpoint="/api/purchaseOrder"
      fields={[
        { key: "id_po", label: "PO Number" },
        { key: "jumlah", label: "Jumlah" },
        { key: "id_type_mesin", label: "Type Mesin" },
        { key: "model", label: "Model" },
        { key: "customer", label: "Customer" },
        { key: "status", label: "Status" },
      ]}
      allowEdit={false}
      allowDelete={false}
    />
  );
}
