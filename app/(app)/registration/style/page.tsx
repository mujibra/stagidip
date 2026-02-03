import CrudPage from "@/components/CrudPage";

export default function Page() {
  return (
    <CrudPage
      title="Style"
      subtitle="Maintain style definitions."
      endpoint="/api/master-style"
      fields={[{ key: "name", label: "Style Name" }]}
    />
  );
}
