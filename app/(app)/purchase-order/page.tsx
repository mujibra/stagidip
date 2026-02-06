import CrudPage from "@/components/CrudPage";

export default function Page() {
  return (
    <CrudPage
      title="Staging Registration"
      subtitle="Manage staging registration requests."
      endpoint="/api/purchaseOrder"
      fields={[
        { key: "jumlah", label: "Jumlah" },
        { key: "id_type_mesin", label: "Type Mesin" },
        { key: "model", label: "Model" },
        { key: "customer", label: "Customer" },
      ]}
      allowEdit={false}
      allowDelete={false}
    />
  );
}
