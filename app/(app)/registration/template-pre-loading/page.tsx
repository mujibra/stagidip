import CrudPage from "@/components/CrudPage";

export default function Page() {
  return (
    <CrudPage
      title="Template Pre-Loading"
      subtitle="Define pre-loading templates."
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
    />
  );
}
