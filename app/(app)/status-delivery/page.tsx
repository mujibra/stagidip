import CrudPage from "@/components/CrudPage";

export default function Page() {
  return (
    <CrudPage
      title="Status Delivery"
      subtitle="Track delivery status records and validate core create/edit/delete flows."
      endpoint="/api/statusDelivery"
      updateEndpoint="/api/statusDelivery/id"
      deleteEndpoint="/api/statusDelivery/id"
      idKey="id"
      fields={[
        { key: "id_po", label: "PO ID" },
        { key: "id_mesin", label: "Machine ID" },
        { key: "sn_mesin", label: "SN Mesin" },
        { key: "tgl_perkiraan_tiba", label: "ETA" },
        { key: "tgl_perkiraan_keluar", label: "ETD" },
        { key: "notes", label: "Notes", type: "textarea" },
      ]}
    />
  );
}
