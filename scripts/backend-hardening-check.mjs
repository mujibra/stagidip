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
      "lib/http/errorResponse.test.ts",
      "lib/http/masterDataValidation.test.ts",
      "lib/http/purchaseOrderValidation.test.ts",
      "lib/http/purchaseOrderRuntimeValidation.test.ts",
      "lib/http/statusDeliveryValidation.test.ts",
      "lib/http/statusDeliveryDetailValidation.test.ts",
      "lib/http/userValidation.test.ts",
      "lib/http/userQueryValidation.test.ts",
      "lib/http/warehouseTransferValidation.test.ts",
    ],
  },
  {
    label: "API hardening lint",
    cmd: "npx",
    args: [
      "eslint",
      "app/api/(purchaseOrder)/purchaseOrder/route.ts",
      "app/api/brand/[id]/route.ts",
      "app/api/bacth/[id]/route.ts",
      "app/api/pic-mitra/[id]/route.ts",
      "app/api/master-style/[id]/route.ts",
      "app/api/master-gudang/route.ts",
      "app/api/master-gudang/[id]/route.ts",
      "app/api/master-style/route.ts",
      "app/api/pic-mitra/route.ts",
      "app/api/brand/route.ts",
      "app/api/bacth/route.ts",
      "app/api/master-customer/route.ts",
      "app/api/master-customer/[id]/route.ts",
      "app/api/master-po/[idPoMaster]/route.ts",
      "app/api/master-type-spek-mesin/parent/[idParent]/route.ts",
      "app/api/master-part/[id]/route.ts",
      "app/api/master-part/route.ts",
      "app/api/master-model/route.ts",
      "app/api/master-model/[id]/route.ts",
      "app/api/master-spesifikasi-mesin/route.ts",
      "app/api/master-spesifikasi-mesin/[id]/route.ts",
      "app/api/master-type-spek-mesin/[idType]/route.ts",
      "app/api/master-parent-type-spek-mesin/[idParent]/route.ts",
      "app/api/master-spek-mesin-f-new/[idListItem]/route.ts",
      "app/api/(purchaseOrder)/purchaseOrder/[idPo]/route.ts",
      "app/api/(purchaseOrder)/purchaseOrder/[idPo]/cancel/route.ts",
      "app/api/(purchaseOrder)/purchaseOrder/[idPo]/datas/route.ts",
      "app/api/(purchaseOrder)/allsnmesin/[idPo]/route.ts",
      "app/api/(purchaseOrder)/get-notes/[idPo]/[idMesin]/route.ts",
      "app/api/(purchaseOrder)/update-notes/[idPo]/[idMesin]/route.ts",
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
      "app/api/(user)/master-user/route.ts",
      "app/api/(user)/get-pic-approval/[type]/route.ts",
      "app/api/(user)/picmitra/v2/[type]/[id_user_login]/route.ts",
      "lib/http/validation.ts",
      "lib/http/filterParamValidation.ts",
      "lib/http/masterDataValidation.ts",
      "lib/http/purchaseOrderValidation.ts",
      "lib/http/purchaseOrderRuntimeValidation.ts",
      "lib/http/statusDeliveryValidation.ts",
      "lib/http/statusDeliveryDetailValidation.ts",
      "lib/http/userValidation.ts",
      "lib/http/userQueryValidation.ts",
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
