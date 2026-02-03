import CrudPage from "@/components/CrudPage";

export default function Page() {
  return (
    <CrudPage
      title="Purchase Order"
      subtitle="Review and manage purchase orders."
      endpoint="/api/master-po"
      fields={[
        { key: "no_po_master", label: "PO Number" },
        { key: "tgl_po", label: "PO Date" },
        { key: "id_customer", label: "Customer ID" },
        { key: "status_po", label: "Status" },
      ]}
    />
  );
}
