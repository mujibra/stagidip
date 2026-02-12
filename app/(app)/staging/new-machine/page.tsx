import CrudPage from "@/components/CrudPage";

export default function Page() {
  return (
    <CrudPage
      title="Staging New Machine"
      subtitle="Review new-machine staging candidates and approval readiness states."
      endpoint="/api/purchaseOrder"
      fields={[
        { key: "id", label: "PO ID" },
        { key: "jumlah", label: "Jumlah" },
        { key: "id_type_mesin", label: "Type Mesin" },
        { key: "model", label: "Model" },
        { key: "status_mesin", label: "Status Mesin" },
      ]}
      allowCreate={false}
      allowEdit={false}
      allowDelete={false}
      emptyText="No staging-ready new-machine records found for current filters."
      exportFileName="staging-new-machine"
    />
  );
}
