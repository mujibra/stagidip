import CrudPage from "@/components/CrudPage";

export default function Page() {
  return (
    <CrudPage
      title="Staging New Machine"
      subtitle="Review new machine staging."
      endpoint="/api/purchaseOrder"
      fields={[
        { key: "id", label: "PO ID" },
        { key: "jumlah", label: "Jumlah" },
        { key: "id_type_mesin", label: "Type Mesin" },
        { key: "model", label: "Model" },
        { key: "status_mesin", label: "Status Mesin" },
      ]}
      allowEdit={false}
      allowDelete={false}
    />
  );
}
