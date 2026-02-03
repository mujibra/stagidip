import CrudPage from "@/components/CrudPage";

export default function Page() {
  return (
    <CrudPage
      title="Detail Part Number"
      subtitle="Maintain part number details."
      endpoint="/api/master-part"
      listEndpoint="/api/master-part?page=1&perPage=50"
      fields={[
        { key: "id_mesin", label: "Machine ID" },
        { key: "part_no", label: "Part Number" },
        { key: "part_desc", label: "Part Description" },
        { key: "status", label: "Status" },
        { key: "types", label: "Type" },
        { key: "format", label: "Format" },
        { key: "position", label: "Position" },
      ]}
    />
  );
}
