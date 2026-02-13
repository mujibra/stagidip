import ReadOnlyStagingMachinePage from "@/components/staging/ReadOnlyStagingMachinePage";

export default function Page() {
  return (
    <ReadOnlyStagingMachinePage
      title="Staging New Machine"
      subtitle="Review new-machine staging candidates and approval readiness states."
      emptyText="No staging-ready new-machine records found for current filters."
      exportFileName="staging-new-machine"
    />
  );
}
