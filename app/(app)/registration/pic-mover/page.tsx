import CrudPage from "@/components/CrudPage";

export default function Page() {
  return (
    <CrudPage
      title="PIC Mover"
      subtitle="Manage PIC mover assignments."
      endpoint="/api/picMover"
      listEndpoint="/api/picMover/10?page=1"
      fields={[
        { key: "gudang", label: "Warehouse" },
        { key: "pic_mover", label: "PIC Mover" },
      ]}
    />
  );
}
