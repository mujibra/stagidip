import CrudPage from "@/components/CrudPage";

export default function Page() {
  return (
    <CrudPage
      title="Status PO"
      subtitle="Manage purchase order statuses."
      endpoint="/api/status-po"
      listEndpoint="/api/status-po"
      createEndpoint="/api/addStatusPo"
      updateEndpoint="/api/ubahStatusPo"
      deleteEndpoint="/api/hapusStatusPo"
      fields={[{ key: "status_desc", label: "Status Description" }]}
    />
  );
}
