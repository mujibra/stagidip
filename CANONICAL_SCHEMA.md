# Canonical Data Model

This document defines the authoritative data model.
All legacy tables are considered non-canonical.

---

## PurchaseOrder

Represents a business purchase order.

Fields:
- id
- poNumber (unique)
- customerId
- status (POStatus enum)
- orderedAt
- notes

Rules:
- PO contains NO machine or part data
- Status is controlled by backend only

---

## MachineInstance

Represents a physical machine unit created from a PO.

---

## MachineDefinition

Represents a machine catalog definition (brand/model/type).
