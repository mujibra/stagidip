import CrudPage from "@/components/CrudPage";

export default function Page() {
  return (
    <CrudPage
      title="Summary Warehouse"
      subtitle="Warehouse summary insights."
      endpoint="/api/getDataMesinPerWarehouse"
      fields={[
        { key: "gudang_name", label: "Warehouse" },
        { key: "jumlah", label: "Total Mesin" },
      ]}
      allowCreate={false}
      allowEdit={false}
      allowDelete={false}
    />
  );
}
