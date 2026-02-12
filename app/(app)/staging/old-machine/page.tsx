import ReadOnlyStagingMachinePage from "@/components/staging/ReadOnlyStagingMachinePage";

export default function Page() {
  return (
    <ReadOnlyStagingMachinePage
      title="Staging Old Machine"
      subtitle="Review old-machine staging records and approval readiness states."
      emptyText="No staging-ready old-machine records found for current filters."
      exportFileName="staging-old-machine"
    />
  );
}
