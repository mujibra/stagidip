import { readFileSync } from 'node:fs';

const checks = [
  ['app/(app)/porcaheOrder/page.tsx', '/purchase-order'],
  ['app/(app)/statusDelivery/page.tsx', '/status-delivery'],
  ['app/(app)/warehouseTransfer/page.tsx', '/warehouse-transfer'],
  ['app/(app)/viewNewMachine/page.tsx', '/staging/new-machine'],
  ['app/(app)/viewOldMachine/page.tsx', '/staging/old-machine'],
  ['app/(app)/stagging/checklistStagging/page.tsx', '/pre-staging/checklist'],
  ['app/(app)/stagging/inspeksiTestings/page.tsx', '/staging/inspection-testing'],
  ['app/(app)/summary/deliveryRequest/page.tsx', '/summary/delivery-request'],
  ['app/(app)/summary/developmentSummary/page.tsx', '/summary/development'],
  ['app/(app)/summary/durationReportSummary/page.tsx', '/summary/duration-report'],
  ['app/(app)/summary/durationStagingSummary/page.tsx', '/summary/duration-staging'],
  ['app/(app)/summary/implementationTable/page.tsx', '/summary/implementation'],
  ['app/(app)/summary/newMachine/page.tsx', '/summary/new-machine'],
  ['app/(app)/summary/oldMachine/page.tsx', '/summary/old-machine'],
  ['app/(app)/summary/preStaging/page.tsx', '/summary/pre-staging'],
  ['app/(app)/summary/statusDelivery/page.tsx', '/summary/status-delivery'],
  ['app/(app)/summary/warehouseTransper/page.tsx', '/summary/warehouse-transfer'],
  ['app/(app)/integration/page.tsx', '/integration/my-datindo'],
];

let failed = 0;
for (const [file, route] of checks) {
  const content = readFileSync(file, 'utf8');
  if (!content.includes(`redirect("${route}")`)) {
    console.error(`✗ ${file} is not redirecting to ${route}`);
    failed += 1;
  }
}

if (failed > 0) {
  console.error(`\n${failed} redirect checks failed.`);
  process.exit(1);
}

console.log(`✓ ${checks.length} canonical redirect aliases verified.`);
