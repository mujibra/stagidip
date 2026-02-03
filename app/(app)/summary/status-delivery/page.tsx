import CrudPage from "@/components/CrudPage";

export default function Page() {
  return (
    <CrudPage
      title="Summary Status Delivery"
      subtitle="Status delivery summary insights."
      endpoint="/api/statusDelivery"
      fields={[
        { key: "id_po", label: "PO ID" },
        { key: "id_mesin", label: "Machine ID" },
        { key: "sn_mesin", label: "SN Mesin" },
        { key: "tgl_perkiraan_tiba", label: "ETA" },
        { key: "tgl_perkiraan_keluar", label: "ETD" },
        { key: "notes", label: "Notes" },
      ]}
      allowCreate={false}
      allowEdit={false}
      allowDelete={false}
    />
  );
}
