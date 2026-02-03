import CrudPage from "@/components/CrudPage";

export default function Page() {
  return (
    <CrudPage
      title="Implementation Table"
      subtitle="Implementation summary details."
      endpoint="/api/getDataProjectStatus"
      dataKey="datas_per_customer"
      fields={[
        { key: "bank_desc", label: "Customer" },
        { key: "jumlah", label: "Installed" },
        { key: "total_mesin", label: "Total Mesin" },
        { key: "persentase", label: "Persentase" },
      ]}
      allowCreate={false}
      allowEdit={false}
      allowDelete={false}
    />
  );
}
