import CrudPage from "@/components/CrudPage";

export default function Page() {
  return (
    <CrudPage
      title="Pre-Staging Checklist"
      subtitle="Review checklist readiness prior to staging and approval handoff."
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
      emptyText="No pre-staging checklist records available."
      exportFileName="pre-staging-checklist"
    />
  );
}
