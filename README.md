# india-utils

Zero-dependency validators and formatters for Indian identifiers and numbers.

```bash
npm i india-utils
```

```ts
import {
  isValidPAN, isValidGSTIN, isValidIFSC, isValidAadhaar,
  isValidPincode, isValidUPI, formatINR, panFromGSTIN, maskAadhaar,
} from "india-utils";

isValidPAN("ABCPV1234D");        // true
isValidGSTIN("27AAPFU0939F1ZV"); // true  (format + mod-36 checksum)
isValidIFSC("HDFC0001234");      // true  (format only)
isValidAadhaar("2345 6789 0124");// true  (format + Verhoeff checksum)
isValidPincode("110001");        // true
isValidUPI("mayur@okaxis");      // true

formatINR(1234567);              // "₹12,34,567"
panFromGSTIN("27AAPFU0939F1ZV"); // "AAPFU0939F"
maskAadhaar("234567890124");     // "XXXX XXXX 0124"
```

## API

| Function | What it checks |
|---|---|
| `isValidPAN(s)` | Shape + entity-type character. PAN has no public checksum. |
| `isValidGSTIN(s)` | Shape, state code, embedded PAN, mod-36 checksum. |
| `isValidAadhaar(s)` | 12 digits, first digit 2–9, Verhoeff check digit. |
| `isValidIFSC(s)` | Shape only — does not confirm the branch exists. |
| `isValidPincode(s)` | 6 digits, zone 1–9. Does not confirm the code is in use. |
| `isValidUPI(s)` | `local@handle` shape. No checksum exists for VPAs. |
| `formatINR(n, opts?)` | Lakh/crore grouping. `{ symbol?, decimals? }`. |
| `panFromGSTIN(s)` | The PAN embedded in a valid GSTIN, else `null`. |
| `maskAadhaar(s)` | `"XXXX XXXX 0123"`, for display and logs. |
| `verhoeffCheckDigit(s)` | The Verhoeff check digit for a digit string. |
| `normalize*(s)` | Trimmed, uppercased/cleaned value, or `null` if invalid. |

Every validator accepts messy input — surrounding whitespace, lowercase, and
for Aadhaar the spaces or hyphens people actually type.

**These are format checks.** A `true` means the identifier is well-formed and
its checksum holds, not that it is registered to anyone. Verifying that
requires the relevant government API.

Requires Node 18+ (full-ICU `Intl` for `formatINR`).

## License

MIT
