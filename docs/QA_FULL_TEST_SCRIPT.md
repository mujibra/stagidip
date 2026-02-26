# STAGIDIP QA GUIDE (NON-TECHNICAL / MANUAL TEST)

> This version is for QA who do **not** read code.
> 
> Use this like a checklist: open page -> click button -> compare result.

---

## A. Before Testing (Very Important)

1. Ask developer/admin for:
   - URL website (example: `http://localhost:3000`)
   - 1 valid login account
   - 1 invalid login account (or wrong password)
2. Open browser in Incognito.
3. Login page must open.

If login page cannot open, stop and report: **"Environment not ready"**.

---

## B. Simple Test Result Format

For each test case, mark:

- ✅ PASS = result same as expected
- ❌ FAIL = result not same as expected
- ⛔ BLOCKED = cannot test (data/access/environment missing)

Template:

| Test ID | Page | Result | Evidence (Screenshot Name) | Notes |
|---|---|---|---|---|
| AUTH-01 | Login | ✅ PASS | auth-01.png | - |

---

## C. CORE FLOW (Do this first)

## AUTH MODULE

### AUTH-01 — Open protected page without login
- Step:
  1. In incognito, open `/dashboard` directly.
- Expected:
  - Automatically redirected to `/login`.

### AUTH-02 — Login with valid account
- Step:
  1. Open `/login`.
  2. Input valid email + password.
  3. Click **Sign in**.
- Expected:
  - Go to Dashboard page.
  - Sidebar menu visible.

### AUTH-03 — Login with wrong password
- Step:
  1. Logout first (if still logged in).
  2. Input valid email + wrong password.
- Expected:
  - Error message shown.
  - Stay on login page.

### AUTH-04 — Logout
- Step:
  1. Click **Logout** button.
  2. Open `/dashboard` again.
- Expected:
  - Redirect back to login.

---

## D. MENU-BY-MENU MANUAL TEST (NO CODE)

> Rule for every data table page:
> 1) Page loads
> 2) Search works
> 3) Add/Edit/Delete (if button exists)
> 4) Success/error message appears
> 5) Data updates in table

## 1) Dashboard
- Open: `Dashboard` menu
- Check:
  - Tab can be changed
  - No blank white screen
  - No crash error

## 2) Registration Menu
Open each submenu below and repeat table rule:

- Purchase Order (registration)
- Types
- Models
- User Management
- Detail Part Number
- Detail Specification
- Detail Prestaging
- Detail Preloading
- Setting Pre Staging
- Warehouse
- Batch
- Customer
- Status PO
- Style

Special for **User Management**:
- Verify role filter works.
- Verify status filter works.

Special for **Batch**:
- Check popup modal Add/Edit can open and close.

## 3) Specification
- Open `Specification` menu.
- Verify table loads and search works.

## 4) Staging Registration (Purchase Order)
- Open `Staging Registration` menu.
- Verify:
  - Search works
  - Status filter works
  - Pagination works

## 5) Pre Staging
- Open `Pre Staging Checklist`.
- Verify list shows data (or proper empty message).

## 6) Staging
Test pages:
- Staging New Machine
- Staging Old Machine
- Pre Loading Inspection

Check each page:
- Table loads
- No crash
- If export button exists, export works

## 7) Status Delivery
- Open `Status Delivery`.
- If Add/Edit/Delete available, test all 3 actions.

## 8) Warehouse
- Open `Warehouse Transfer`.
- Verify date fields can be input and saved.
- Verify list updates after save.

- Open `Delivery Request` (from warehouse/summary link).
- Verify page opens and data visible.

## 9) Summary
Open each summary page and verify it opens normally:
- Summary Machine
- Summary Accessories
- Summary New Machine
- Summary Old Machine
- Summary Warehouse Transfer
- Summary Warehouse
- Summary Pre Staging
- Duration Staging Summary
- Duration Report Summary
- Development Summary
- Summary Status Delivery
- Summary UPS
- Implementation Table

## 10) My Datindo Integration
- Open `My Datindo Integration`.
- Verify table appears and no crash.

---

## E. Alias URL Test (Important)

Copy URL below one-by-one in browser, expected redirect to right page:

| Open URL | Must redirect to |
|---|---|
| `/statusDelivery` | `/status-delivery` |
| `/warehouseTransfer` | `/warehouse-transfer` |
| `/viewNewMachine` | `/staging/new-machine` |
| `/viewOldMachine` | `/staging/old-machine` |
| `/porcaheOrder` | `/purchase-order` |

If not redirected correctly, mark FAIL.

---

## F. Bug Report Format (for QA)

Use this simple format for every bug:

1. **Title**: short bug title
2. **Page/Menu**: where issue happened
3. **Steps**:
   - Step 1
   - Step 2
4. **Actual Result**: what happened
5. **Expected Result**: what should happen
6. **Evidence**: screenshot/video
7. **Severity**: High / Medium / Low

---

## G. Final Sign-off (Simple)

| Area | PASS | FAIL | BLOCKED | Notes |
|---|---:|---:|---:|---|
| Auth |  |  |  |  |
| Dashboard |  |  |  |  |
| Registration |  |  |  |  |
| Specification |  |  |  |  |
| Staging |  |  |  |  |
| Status Delivery |  |  |  |  |
| Warehouse |  |  |  |  |
| Summary |  |  |  |  |
| Integration |  |  |  |  |

Final decision:
- [ ] READY FOR UAT
- [ ] READY WITH MINOR FIX
- [ ] NOT READY
