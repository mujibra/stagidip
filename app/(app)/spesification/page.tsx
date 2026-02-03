import CrudPage from "@/components/CrudPage";

export default function Page() {
  return (
    <CrudPage
      title="Specification"
      subtitle="Maintain specification records."
      endpoint="/api/master-spekmesin"
      fields={[
        { key: "item", label: "Item" },
        { key: "description", label: "Description" },
      ]}
      allowEdit={false}
      allowDelete={false}
    />
  );
}
