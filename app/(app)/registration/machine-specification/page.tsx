import CrudPage from "@/components/CrudPage";

export default function Page() {
  return (
    <CrudPage
      title="Machine Specification"
      subtitle="Define machine specifications."
      endpoint="/api/master-spek-mesin-f-new"
      listEndpoint="/api/master-spek-mesin-f-new?page=1&perPage=50"
      fields={[
        { key: "item_id", label: "Item ID" },
        { key: "item_code", label: "Item Code" },
        { key: "description", label: "Description", type: "textarea" },
      ]}
      allowEdit={false}
      allowDelete={false}
    />
  );
}
