import CrudPage from "@/components/CrudPage";

export default function Page() {
  return (
    <CrudPage
      title="Summary Machine"
      subtitle="Machine summary insights."
      endpoint="/api/master-mesin"
      fields={[
        { key: "merek", label: "Brand" },
        { key: "model", label: "Model ID" },
        { key: "type", label: "Type" },
        { key: "status", label: "Status" },
      ]}
      allowCreate={false}
      allowEdit={false}
      allowDelete={false}
    />
  );
}
