import CrudPage from "@/components/CrudPage";

export default function Page() {
  return (
    <CrudPage
      title="Staging Inspection Testing"
      subtitle="Track inspection/testing checklist outcomes and approval-relevant notes."
      endpoint="/api/mst-checkliststaging"
      fields={[
        { key: "test_desc", label: "Test Description" },
        { key: "result_detail", label: "Result Detail" },
        { key: "id_divisi", label: "Division ID" },
        { key: "id_mesin", label: "Machine ID" },
      ]}
      allowCreate={false}
      allowEdit={false}
      allowDelete={false}
      emptyText="No inspection-testing checklist records available."
      exportFileName="staging-inspection-testing"
    />
  );
}
