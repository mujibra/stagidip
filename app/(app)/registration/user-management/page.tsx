import CrudPage from "@/components/CrudPage";

export default function Page() {
  return (
    <CrudPage
      title="User Management"
      subtitle="Manage user access and roles."
      endpoint="/api/master-user"
      fields={[
        { key: "name", label: "Name" },
        { key: "email", label: "Email" },
        { key: "roles", label: "Role" },
        { key: "status", label: "Status" },
      ]}
      allowCreate={false}
      allowEdit={false}
      allowDelete={false}
    />
  );
}
