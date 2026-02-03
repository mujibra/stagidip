import CrudPage from "@/components/CrudPage";

export default function Page() {
  return (
    <CrudPage
      title="Machine"
      subtitle="Maintain machine records."
      endpoint="/api/master-mesin"
      fields={[
        { key: "merek", label: "Brand" },
        { key: "model", label: "Model ID" },
        { key: "type", label: "Type" },
      ]}
    />
  );
}
