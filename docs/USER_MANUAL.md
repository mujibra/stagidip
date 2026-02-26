# STAGIDIP USER MANUAL (EASY VERSION FOR OPERATION TEAM)

This manual is made for users who are not technical.

---

## 1. What is this system?

StagiDIP is an internal web system to manage:
- registration/master data
- staging process
- warehouse transfer
- delivery status
- summary reports
- integration monitoring

---

## 2. How to login

1. Open website URL from IT/admin.
2. Input email and password.
3. Click **Sign in**.
4. If login success, Dashboard page opens.

If login fails:
- Check email/password again.
- Contact admin if still cannot login.

---

## 3. Main menus and function (simple)

## Dashboard
See high-level operational data and tabs.

## Registration
Create and maintain master data (type, model, warehouse, customer, user, etc).

## Specification
Manage machine/specification data.

## Staging Registration (Purchase Order)
Manage purchase-order operational records for staging process.

## Pre Staging
Checklist before staging starts.

## Staging
Monitor new machine, old machine, and pre-loading inspection pages.

## Status Delivery
Track machine delivery progress and notes.

## Warehouse
Manage warehouse transfer and delivery request related data.

## Summary
See reporting pages for machine, warehouse, status delivery, duration, and other summaries.

## My Datindo Integration
Monitor integration data (ws, serial, ticket, installation date).

---

## 4. Standard way to use table pages

For most pages, use this flow:

1. **Search** data by keyword.
2. **Add** new data (if Add button exists).
3. **Edit** existing row (if Edit button exists).
4. **Delete** row (if Delete button exists).
5. Confirm success message appears.
6. Re-check table to ensure data changed.

If button does not exist, that page is read-only.

---

## 5. Daily operation checklist

At start of day:
1. Login success.
2. Dashboard opens.
3. Open 1-2 critical pages (Status Delivery, Warehouse Transfer).

During operation:
1. Input/update data in related module.
2. Validate row appears in table.
3. Use search/filter to verify data.

End of day:
1. Open Summary pages for final checks.
2. Export data if required by team.
3. Logout.

---

## 6. If error happens

When finding issue:
1. Take screenshot.
2. Write page name/menu.
3. Write steps before error.
4. Send report to dev/IT with:
   - expected result
   - actual result

Use QA checklist document for full test steps:

- `docs/QA_FULL_TEST_SCRIPT.md`

---

## 7. Important note

- Some old URLs are aliases and will auto-redirect to new URL.
- If you get "Unauthorized" or redirected to login, please login again.
- If page is blank/failed to load repeatedly, report to IT/developer.
