import CrudPage from "@/components/CrudPage";

export default function Page() {
  return (
    <CrudPage
      title="Detail Specification"
      subtitle="Maintain specification details."
      endpoint="/api/master-spesifikasi-mesin"
      listEndpoint="/api/master-spesifikasi-mesin?page=1&perPage=50"
      fields={[
        { key: "item", label: "Item" },
        { key: "description", label: "Description", type: "textarea" },
      ]}
      allowEdit={false}
      allowDelete={false}
    />
  );
}
