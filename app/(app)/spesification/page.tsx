import CrudPage from "@/components/CrudPage";

export default function Page() {
  return (
    <CrudPage
      title="Specification"
      subtitle="Maintain machine specification records and execute Batch 3 CRUD parity checks."
      endpoint="/api/master-spekmesin"
      listEndpoint="/api/master-spekmesin/paging/10?page=1"
      idKey="id"
      fields={[
        { key: "item", label: "Item" },
        { key: "description", label: "Description", type: "textarea" },
      ]}
      allowDelete={false}
    />
  );
}
