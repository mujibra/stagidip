import CrudPage from "@/components/CrudPage";

export default function Page() {
  return (
    <CrudPage
      title="Duration Report Summary"
      subtitle="Duration report summary insights."
      endpoint="/api/purchaseOrder"
      fields={[
        { key: "id", label: "PO ID" },
        { key: "tgl_staging", label: "Tanggal Staging" },
        { key: "jumlah", label: "Jumlah" },
      ]}
      allowCreate={false}
      allowEdit={false}
      allowDelete={false}
    />
  );
}
