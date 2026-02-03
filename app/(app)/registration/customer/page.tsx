import CrudPage from "@/components/CrudPage";

export default function Page() {
  return (
    <CrudPage
      title="Customer"
      subtitle="Maintain customer records."
      endpoint="/api/master-customer"
      fields={[
        { key: "bank_desc", label: "Customer Name" },
        { key: "address", label: "Address", type: "textarea" },
      ]}
    />
  );
}
