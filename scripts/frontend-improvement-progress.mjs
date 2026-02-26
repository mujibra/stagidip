#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const trackerPath = process.argv[2] ?? "docs/migration/FRONTEND_IMPROVEMENTS_NEXT.md";
const absPath = path.resolve(trackerPath);

const raw = fs.readFileSync(absPath, "utf8");
const lines = raw.split(/\r?\n/);

const statusPattern = /\|\s*`([^`]+)`\s*\|\s*$/;
const statusRows = [];

for (const [index, line] of lines.entries()) {
  const match = line.match(statusPattern);
  if (!match) continue;

  const cells = line
    .split("|")
    .map((cell) => cell.trim())
    .filter((cell) => cell.length > 0);

  if (cells.length < 6) continue;

  statusRows.push({
    line: index + 1,
    area: cells[0],
    improvement: cells[1],
    status: match[1].toLowerCase(),
  });
}

if (statusRows.length === 0) {
  console.error(`No status rows found in ${trackerPath}`);
  process.exit(1);
}

const totals = new Map();
for (const row of statusRows) {
  totals.set(row.status, (totals.get(row.status) ?? 0) + 1);
}

const total = statusRows.length;
const done = totals.get("done") ?? 0;
const qaReview = totals.get("qa-review") ?? 0;
const inProgress = totals.get("in-progress") ?? 0;

const implementationProgress = ((done + qaReview) / total) * 100;
const closureProgress = (done / total) * 100;

const fmt = (value) => value.toFixed(1);

console.log(`Tracker: ${trackerPath}`);
console.log(`Rows: ${total}`);
console.log(`Implementation progress (done + qa-review): ${fmt(implementationProgress)}% (${done + qaReview}/${total})`);
console.log(`Closure progress (done only): ${fmt(closureProgress)}% (${done}/${total})`);

console.log("\nStatus counts:");
for (const [status, count] of [...totals.entries()].sort((a, b) => a[0].localeCompare(b[0]))) {
  console.log(`- ${status}: ${count}`);
}

if (inProgress > 0) {
  console.log("\nIn-progress rows:");
  for (const row of statusRows.filter((row) => row.status === "in-progress")) {
    console.log(`- L${row.line}: ${row.area} — ${row.improvement}`);
  }
}

if (qaReview > 0) {
  console.log("\nQA-review rows:");
  for (const row of statusRows.filter((row) => row.status === "qa-review")) {
    console.log(`- L${row.line}: ${row.area} — ${row.improvement}`);
  }
}
