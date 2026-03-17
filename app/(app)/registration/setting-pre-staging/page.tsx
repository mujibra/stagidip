import CrudPage from "@/components/CrudPage";

export default function Page() {
  return (
    <CrudPage
      title="Setting Pre-Staging"
      subtitle="Configure pre-staging settings."
      endpoint="/api/settingPreStaging"
      listEndpoint="/api/settingPreStaging?page=1"
      fields={[
        { key: "types", label: "Type" },
        { key: "description", label: "Description", type: "textarea" },
      ]}
    />
  );
}
