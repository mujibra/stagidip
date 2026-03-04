#!/usr/bin/env node
import { spawnSync } from "node:child_process";

const checks = [
  {
    label: "Validation unit tests",
    cmd: "npx",
    args: [
      "tsx",
      "--test",
      "lib/http/validation.test.ts",
      "lib/http/filterParamValidation.test.ts",
      "lib/http/purchaseOrderValidation.test.ts",
      "lib/http/statusDeliveryValidation.test.ts",
      "lib/http/statusDeliveryDetailValidation.test.ts",
      "lib/http/userValidation.test.ts",
      "lib/http/warehouseTransferValidation.test.ts",
    ],
  },
  {
    label: "API hardening lint",
    cmd: "npx",
    args: [
      "eslint",
      "app/api/(purchaseOrder)/purchaseOrder/route.ts",
      "app/api/(purchaseOrder)/purchaseOrder/[idPo]/route.ts",
      "app/api/(statusDelivery)/statusDelivery/route.ts",
      "app/api/(statusDelivery)/statusDelivery/id/[id]/route.ts",
      "app/api/(statusDelivery)/statusDelivery/[rowPerPage]/[user_login]/route.ts",
      "app/api/(statusDelivery)/statusDeliveryDetail/route.ts",
      "app/api/(statusDelivery)/statusDeliveryDetail/[id]/route.ts",
      "app/api/(statusDelivery)/get-status-delivery/[idPo]/[snMesin]/[id_customer]/[warehouse]/[tgl_tiba]/route.ts",
      "app/api/(warehouse)/warehouse-transfer/route.ts",
      "app/api/(warehouse)/warehouse-transfer/[id]/route.ts",
      "app/api/(warehouse)/get-warehouse-transfer/[idPo]/[snMesin]/[from_warehouse]/[tgl_keluar]/route.ts",
      "app/api/(user)/users/[id]/[user_login]/route.ts",
      "lib/http/validation.ts",
      "lib/http/filterParamValidation.ts",
      "lib/http/purchaseOrderValidation.ts",
      "lib/http/statusDeliveryValidation.ts",
      "lib/http/statusDeliveryDetailValidation.ts",
      "lib/http/userValidation.ts",
      "lib/http/warehouseTransferValidation.ts",
    ],
  },
  {
    label: "Dashboard query param regression tests",
    cmd: "npm",
    args: ["run", "-s", "test:dashboard"],
  },
  {
    label: "Canonical route regression check",
    cmd: "npm",
    args: ["run", "-s", "migration:check-routes"],
  },
];

for (const check of checks) {
  console.log(`\n=== ${check.label} ===`);
  const result = spawnSync(check.cmd, check.args, {
    stdio: "inherit",
    shell: process.platform === "win32",
  });

  if (result.status !== 0) {
    console.error(`\n❌ Failed: ${check.label}`);
    process.exit(result.status ?? 1);
  }
}

console.log("\n✅ Backend hardening checks passed.");
