#!/usr/bin/env node
import { spawnSync } from "node:child_process";

function run(cmd, args) {
  const result = spawnSync(cmd, args, {
    stdio: "inherit",
    shell: process.platform === "win32",
  });

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

run("npm", ["run", "-s", "docs:infer-examples", "--", "--write"]);

const diff = spawnSync("git", ["diff", "--", "docs/api/openapi.yaml"], {
  encoding: "utf8",
  shell: process.platform === "win32",
});

if (diff.status !== 0) {
  console.error("❌ Unable to diff docs/api/openapi.yaml");
  process.exit(diff.status ?? 1);
}

if (diff.stdout.trim().length > 0) {
  console.error("❌ API contract drift detected in docs/api/openapi.yaml");
  console.error("Run `npm run docs:infer-examples -- --write` and commit the updated file.");
  process.exit(1);
}

console.log("✅ API contract drift check passed (openapi examples are in sync).");
