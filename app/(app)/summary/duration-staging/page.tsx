import CrudPage from "@/components/CrudPage";

export default function Page() {
  return (
    <CrudPage
      title="Duration Staging Summary"
      subtitle="Duration staging summary insights."
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
