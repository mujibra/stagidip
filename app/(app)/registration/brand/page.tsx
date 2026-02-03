import CrudPage from "@/components/CrudPage";

export default function Page() {
  return (
    <CrudPage
      title="Brand"
      subtitle="Maintain brand information."
      endpoint="/api/brand"
      fields={[{ key: "name", label: "Brand Name" }]}
      createContentType="form"
    />
  );
}
