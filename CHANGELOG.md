# india-utils

## 0.2.0

### Minor Changes

- 3274c5a: Add three validators:
  
  - `isValidAadhaar` / `normalizeAadhaar` / `maskAadhaar`: 12 digits, first digit
    2-9, Verhoeff check digit. Accepts the spaces and hyphens people type.
    `verhoeffCheckDigit` is exported for generating test data.
  - `isValidPincode` / `normalizePincode`: 6 digits, postal zone 1-9.
  - `isValidUPI` / `normalizeUPI`: `local@handle` shape, deliberately permissive
    since NPCI publishes no character-set or length spec.
  
  Also expose `./package.json` via the `exports` map, so tools that read it no
  longer hit `ERR_PACKAGE_PATH_NOT_EXPORTED`.

## 0.1.1

### Patch Changes

- 06568b2: Add repository, homepage and author metadata to package.json; use full name in
  the LICENSE copyright line.

## 0.1.0

### Minor Changes

- dd758fe: Initial release: `isValidPAN`, `isValidGSTIN` (format + mod-36 checksum),
  `isValidIFSC` (format), `formatINR` (lakh/crore grouping), plus `normalize*`
  helpers and `panFromGSTIN`. Zero runtime dependencies, ESM + CJS + types.
