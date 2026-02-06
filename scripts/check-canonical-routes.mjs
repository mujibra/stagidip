import { existsSync, readFileSync } from 'node:fs';

const checks = [
  { file: 'app/(app)/porcaheOrder/page.tsx', route: '/purchase-order' },
  { file: 'app/(app)/statusDelivery/page.tsx', route: '/status-delivery' },
  { file: 'app/(app)/warehouseTransfer/page.tsx', route: '/warehouse-transfer' },
  { file: 'app/(app)/viewNewMachine/page.tsx', route: '/staging/new-machine' },
  { file: 'app/(app)/viewOldMachine/page.tsx', route: '/staging/old-machine' },
  { file: 'app/(app)/stagging/checklistStagging/page.tsx', route: '/pre-staging/checklist' },
  { file: 'app/(app)/stagging/inspeksiTestings/page.tsx', route: '/staging/inspection-testing' },
  { file: 'app/(app)/summary/deliveryRequest/page.tsx', route: '/summary/delivery-request' },
  { file: 'app/(app)/summary/developmentSummary/page.tsx', route: '/summary/development' },
  { file: 'app/(app)/summary/durationReportSummary/page.tsx', route: '/summary/duration-report' },
  { file: 'app/(app)/summary/durationStagingSummary/page.tsx', route: '/summary/duration-staging' },
  { file: 'app/(app)/summary/implementationTable/page.tsx', route: '/summary/implementation' },
  { file: 'app/(app)/summary/newMachine/page.tsx', route: '/summary/new-machine' },
  { file: 'app/(app)/summary/oldMachine/page.tsx', route: '/summary/old-machine' },
  { file: 'app/(app)/summary/preStaging/page.tsx', route: '/summary/pre-staging' },
  { file: 'app/(app)/summary/statusDelivery/page.tsx', route: '/summary/status-delivery' },
  { file: 'app/(app)/summary/warehouseTransper/page.tsx', route: '/summary/warehouse-transfer' },
  { file: 'app/(app)/integration/page.tsx', route: '/integration/my-datindo' },
];

const createRedirectMatcher = (route) => new RegExp(`redirect\\((['\"])${route}\\1\\)`);

let failed = 0;
for (const { file, route } of checks) {
  if (!existsSync(file)) {
    console.error(`✗ ${file} is missing (expected redirect to ${route})`);
    failed += 1;
    continue;
  }

  const content = readFileSync(file, 'utf8');
  const redirectMatcher = createRedirectMatcher(route);

  if (!redirectMatcher.test(content)) {
    console.error(`✗ ${file} is not redirecting to ${route}`);
    failed += 1;
  }
}

if (failed > 0) {
  console.error(`\n${failed} redirect checks failed.`);
  process.exit(1);
}

console.log(`✓ ${checks.length} canonical redirect aliases verified.`);
