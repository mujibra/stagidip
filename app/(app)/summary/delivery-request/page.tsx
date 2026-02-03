import CrudPage from "@/components/CrudPage";

export default function Page() {
  return (
    <CrudPage
      title="Summary Delivery Request"
      subtitle="Delivery request summary insights."
      endpoint="/api/getAllDeliveryRequest"
      fields={[
        { key: "id", label: "ID" },
        { key: "id_po", label: "PO ID" },
        { key: "id_customer", label: "Customer ID" },
        { key: "status", label: "Status" },
        { key: "created_at", label: "Created At" },
      ]}
      allowCreate={false}
      allowEdit={false}
      allowDelete={false}
    />
  );
}
