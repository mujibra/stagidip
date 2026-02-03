import CrudPage from "@/components/CrudPage";

export default function Page() {
  return (
    <CrudPage
      title="Summary"
      subtitle="Overview of summary reports."
      endpoint="/api/purchaseOrder"
      fields={[
        { key: "id", label: "PO ID" },
        { key: "jumlah", label: "Jumlah" },
        { key: "id_type_mesin", label: "Type Mesin" },
        { key: "model", label: "Model" },
        { key: "customer", label: "Customer" },
      ]}
      allowCreate={false}
      allowEdit={false}
      allowDelete={false}
    />
  );
}
