#!/usr/bin/env node

const BASE_URL = process.env.BASE_URL ?? "http://localhost:3000";
const QA_EMAIL = process.env.QA_EMAIL;
const QA_PASSWORD = process.env.QA_PASSWORD;

function joinUrl(path) {
  return `${BASE_URL.replace(/\/$/, "")}${path}`;
}

async function request(path, options = {}) {
  let res;
  try {
    res = await fetch(joinUrl(path), {
      redirect: "manual",
      ...options,
    });
  } catch (error) {
    throw new Error(`Request failed for ${path}. Ensure the app is running at ${BASE_URL}. ${error instanceof Error ? error.message : String(error)}`);
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
}

function warn(message) {
  console.log(`⚠️ ${message}`);
}

function fail(message) {
  console.error(`❌ ${message}`);
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

  for (const path of protectedApis) {
    const result = await request(path);
    assertStatus(result.res.status, 401, `GET ${path} without token`);
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

    for (const path of protectedApis) {
      const authed = await request(path, {
        headers: {
          Cookie: cookie,
        },
      });

      if (authed.res.status === 401) {
        fail(`GET ${path} with token still returned 401`);
      } else {
        ok(`GET ${path} with token returned ${authed.res.status}`);
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

main().catch((error) => {
  fail(`Unhandled error: ${error instanceof Error ? error.message : String(error)}`);
});
