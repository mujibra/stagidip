import CrudPage from "@/components/CrudPage";

export default function Page() {
  return (
    <CrudPage
      title="Models"
      subtitle="Maintain model catalog entries."
      endpoint="/api/master-model"
      fields={[{ key: "name", label: "Model Name" }]}
    />
  );
}
