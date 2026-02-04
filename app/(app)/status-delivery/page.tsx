import CrudPage from "@/components/CrudPage";

export default function Page() {
  return (
    <CrudPage
      title="Status Delivery"
      subtitle="Track delivery status."
      endpoint="/api/statusDelivery"
      listEndpoint="/api/statusDelivery?page=1&perPage=10"
      fields={[
        { key: "id_po", label: "PO ID" },
        { key: "id_mesin", label: "Machine ID" },
        { key: "sn_mesin", label: "SN Mesin" },
        { key: "tgl_perkiraan_tiba", label: "ETA" },
        { key: "tgl_perkiraan_keluar", label: "ETD" },
        { key: "notes", label: "Notes" },
      ]}
      allowEdit={false}
      allowDelete={false}
    />
  );
}
