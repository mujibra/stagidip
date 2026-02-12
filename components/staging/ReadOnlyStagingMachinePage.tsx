import CrudPage from "@/components/CrudPage";

type ReadOnlyStagingMachinePageProps = {
  title: string;
  subtitle: string;
  emptyText: string;
  exportFileName: string;
};

export default function ReadOnlyStagingMachinePage({
  title,
  subtitle,
  emptyText,
  exportFileName,
}: ReadOnlyStagingMachinePageProps) {
  return (
    <CrudPage
      title={title}
      subtitle={subtitle}
      endpoint="/api/purchaseOrder"
      fields={[
        { key: "id", label: "PO ID" },
        { key: "jumlah", label: "Jumlah" },
        { key: "id_type_mesin", label: "Type Mesin" },
        { key: "model", label: "Model" },
        { key: "status_mesin", label: "Status Mesin" },
      ]}
      allowCreate={false}
      allowEdit={false}
      allowDelete={false}
      emptyText={emptyText}
      exportFileName={exportFileName}
    />
  );
}
