import CrudPage from "@/components/CrudPage";

export default function Page() {
  return (
    <CrudPage
      title="Types"
      subtitle="Define machine or product types."
      endpoint="/api/master-type-spek-mesin"
      fields={[
        { key: "val", label: "Value" },
        { key: "label", label: "Label" },
      ]}
      allowCreate={false}
      allowEdit={false}
      allowDelete={false}
    />
  );
}
