import CrudPage from "@/components/CrudPage";

export default function Page() {
  return (
    <CrudPage
      title="My Datindo Integration"
      subtitle="Manage My Datindo integration settings."
      endpoint="/api/register-ws-info"
      fields={[
        { key: "ws_id", label: "WS ID" },
        { key: "ws_name", label: "WS Name" },
        { key: "serial_number", label: "Serial Number" },
        { key: "model", label: "Model" },
        { key: "ticket", label: "Ticket" },
        { key: "installation_date", label: "Installation Date" },
      ]}
      allowCreate={false}
      allowEdit={false}
      allowDelete={false}
    />
  );
}
