#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const BASE_URL = process.env.BASE_URL ?? "http://localhost:3000";
const QA_EMAIL = process.env.QA_EMAIL;
const QA_PASSWORD = process.env.QA_PASSWORD;
const QA_SMOKE_REPORT_PATH = process.env.QA_SMOKE_REPORT_PATH;

const report = {
  baseUrl: BASE_URL,
  startedAt: new Date().toISOString(),
  checks: [],
};

function record(status, label, detail = "") {
  report.checks.push({ status, label, detail, at: new Date().toISOString() });
}

function joinUrl(pathname) {
  return `${BASE_URL.replace(/\/$/, "")}${pathname}`;
}

async function request(pathname, options = {}) {
  let res;
  try {
    res = await fetch(joinUrl(pathname), {
      redirect: "manual",
      ...options,
    });
  } catch (error) {
    throw new Error(`Request failed for ${pathname}. Ensure the app is running at ${BASE_URL}. ${error instanceof Error ? error.message : String(error)}`);
  }

  let body;
  const contentType = res.headers.get("content-type") ?? "";
  if (contentType.includes("application/json")) {
    body = await res.json();
  } else {
    body = await res.text();
  }

  return { res, body };
}

function ok(message) {
  console.log(`✅ ${message}`);
  record("pass", message);
}

function warn(message) {
  console.log(`⚠️ ${message}`);
  record("warn", message);
}

function fail(message) {
  console.error(`❌ ${message}`);
  record("fail", message);
  process.exitCode = 1;
}

function assertStatus(actual, expected, label) {
  if (actual !== expected) {
    fail(`${label}: expected status ${expected}, got ${actual}`);
    return false;
  }
  ok(`${label}: status ${actual}`);
  return true;
}

function normalizeSetCookie(raw) {
  if (!raw) return "";
  return raw.split(";")[0];
}

function assertPaginationEnvelope(body, label) {
  if (typeof body !== "object" || body === null) {
    fail(`${label}: response is not a JSON object`);
    return;
  }

  const hasFields =
    Number.isFinite(body.totalDatas) &&
    Number.isFinite(body.totalPages) &&
    Number.isFinite(body.page) &&
    Number.isFinite(body.perPage) &&
    Array.isArray(body.data);

  if (!hasFields) {
    fail(`${label}: missing one of required pagination fields (totalDatas,totalPages,page,perPage,data[])`);
    return;
  }

  ok(`${label}: pagination envelope is valid`);
}

function writeReport() {
  report.finishedAt = new Date().toISOString();
  report.success = !(process.exitCode && process.exitCode !== 0);

  if (!QA_SMOKE_REPORT_PATH) return;

  const resolved = path.resolve(QA_SMOKE_REPORT_PATH);
  fs.mkdirSync(path.dirname(resolved), { recursive: true });
  fs.writeFileSync(resolved, JSON.stringify(report, null, 2));
  console.log(`Smoke report written to ${resolved}`);
}

async function main() {
  console.log(`Running StagiDIP smoke checks against ${BASE_URL}`);

  // 1) Public health endpoint
  const health = await request("/api/health");
  if (assertStatus(health.res.status, 200, "GET /api/health") && typeof health.body === "object") {
    if (["ok", "degraded"].includes(health.body?.status)) ok(`/api/health payload contains status=${health.body?.status}`);
    else fail("/api/health payload does not contain status=ok|degraded");
  }

  // 2) Login page should be available
  const loginPage = await request("/login");
  if (assertStatus(loginPage.res.status, 200, "GET /login")) {
    const html = typeof loginPage.body === "string" ? loginPage.body : JSON.stringify(loginPage.body);
    if (html.toLowerCase().includes("login") || html.toLowerCase().includes("sign in")) {
      ok("/login renders login content");
    } else {
      warn("/login did not include expected login keywords (may be framework rendering difference)");
    }
  }

  // 3) Protected page should redirect when unauthenticated
  const dashboard = await request("/dashboard");
  if ([307, 308].includes(dashboard.res.status)) {
    ok(`GET /dashboard unauthenticated returns redirect (${dashboard.res.status})`);
  } else {
    fail(`GET /dashboard unauthenticated expected redirect (307/308), got ${dashboard.res.status}`);
  }

  // 4) Protected APIs should reject unauthenticated requests
  const protectedApis = [
    "/api/master-user",
    "/api/purchaseOrder",
    "/api/checklistStaging",
    "/api/statusDelivery",
    "/api/warehouse-transfer",
  ];

  for (const pathname of protectedApis) {
    const result = await request(pathname);
    assertStatus(result.res.status, 401, `GET ${pathname} without token`);
  }

  // 4b) Error-path check: login validation should reject missing fields
  const loginValidation = await request("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({}),
  });

  if (assertStatus(loginValidation.res.status, 400, "POST /api/login without credentials")) {
    if (typeof loginValidation.body === "object" && loginValidation.body?.type === "VALIDATION_ERROR") {
      ok("POST /api/login validation error payload is normalized");
    } else {
      fail("POST /api/login validation response did not contain type=VALIDATION_ERROR");
    }
  }


  // 4b) Error-path check: login validation should reject missing fields
  const loginValidation = await request("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({}),
  });

  if (assertStatus(loginValidation.res.status, 400, "POST /api/login without credentials")) {
    if (typeof loginValidation.body === "object" && loginValidation.body?.type === "VALIDATION_ERROR") {
      ok("POST /api/login validation error payload is normalized");
    } else {
      fail("POST /api/login validation response did not contain type=VALIDATION_ERROR");
    }
  }

  // 5) Optional authenticated checks
  if (QA_EMAIL && QA_PASSWORD) {
    const login = await request("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: QA_EMAIL, password: QA_PASSWORD }),
    });

    if (!assertStatus(login.res.status, 200, "POST /api/login with QA credentials")) {
      console.error("Stopping authenticated checks because login failed.");
      return;
    }

    const setCookieHeader = login.res.headers.get("set-cookie");
    const cookie = normalizeSetCookie(setCookieHeader);
    if (!cookie) {
      fail("POST /api/login succeeded but no Set-Cookie header was returned");
      return;
    }

    ok("Received auth cookie from login");

    for (const pathname of protectedApis) {
      const authed = await request(pathname, {
        headers: {
          Cookie: cookie,
        },
      });

      if (authed.res.status === 401) {
        fail(`GET ${pathname} with token still returned 401`);
      } else {
        ok(`GET ${pathname} with token returned ${authed.res.status}`);
      }
    }

    const paginatedChecks = [
      "/api/purchaseOrder?page=1&perPage=5",
      "/api/warehouse-transfer?page=1&perPage=5",
      "/api/master-part?page=1&perPage=5",
      "/api/master-user?page=1&perPage=5",
    ];

    for (const pathname of paginatedChecks) {
      const result = await request(pathname, {
        headers: { Cookie: cookie },
      });

      if (assertStatus(result.res.status, 200, `GET ${pathname} with token`)) {
        assertPaginationEnvelope(result.body, `GET ${pathname} pagination contract`);
      }
    }
  } else {
    warn("QA_EMAIL/QA_PASSWORD not provided; skipping authenticated smoke checks.");
  }

  if (process.exitCode && process.exitCode !== 0) {
    console.error("Smoke checks completed with failures.");
  } else {
    console.log("All smoke checks completed.");
  }
}

main()
  .catch((error) => {
    fail(`Unhandled error: ${error instanceof Error ? error.message : String(error)}`);
  })
  .finally(() => {
    writeReport();
  });
