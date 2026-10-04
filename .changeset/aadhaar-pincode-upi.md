---
"india-utils": minor
---

Add three validators:

- `isValidAadhaar` / `normalizeAadhaar` / `maskAadhaar` — 12 digits, first digit
  2-9, Verhoeff check digit. Accepts the spaces and hyphens people type.
  `verhoeffCheckDigit` is exported for generating test data.
- `isValidPincode` / `normalizePincode` — 6 digits, postal zone 1-9.
- `isValidUPI` / `normalizeUPI` — `local@handle` shape, deliberately permissive
  since NPCI publishes no character-set or length spec.

Also expose `./package.json` via the `exports` map, so tools that read it no
longer hit `ERR_PACKAGE_PATH_NOT_EXPORTED`.
