import CrudPage from "@/components/CrudPage";

export default function Page() {
  return (
    <CrudPage
      title="Warehouse"
      subtitle="Manage warehouse data."
      endpoint="/api/master-gudang"
      fields={[{ key: "gudang_desc", label: "Warehouse Name" }]}
    />
  );
}
