import CrudPage from "@/components/CrudPage";

export default function Page() {
  return (
    <CrudPage
      title="My Datindo Integration"
      subtitle="Batch 3 integration checks: review registration, serial, ticket, and installation sync data."
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
      exportFileName="integration-my-datindo"
    />
  );
}
