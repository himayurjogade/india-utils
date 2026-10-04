# india-utils

Zero-dependency validators and formatters for Indian identifiers and numbers.

```bash
npm i india-utils
```

```ts
import { isValidPAN, isValidGSTIN, isValidIFSC, formatINR, panFromGSTIN } from "india-utils";

isValidPAN("ABCPV1234D");        // true
isValidGSTIN("27AAPFU0939F1ZV"); // true  (format + mod-36 checksum)
isValidIFSC("HDFC0001234");      // true  (format only)
formatINR(1234567);              // "₹12,34,567"
panFromGSTIN("27AAPFU0939F1ZV"); // "AAPFU0939F"
```

## API

| Function | Notes |
|---|---|
| `isValidPAN(s)` | Shape + entity-type character. PAN has no public checksum. |
| `isValidGSTIN(s)` | Shape, state code, embedded PAN, mod-36 checksum. |
| `isValidIFSC(s)` | Shape only — does not confirm the branch exists. |
| `formatINR(n, opts?)` | Lakh/crore grouping. `{ symbol?, decimals? }`. |
| `normalizePAN/GSTIN/IFSC(s)` | Trimmed, uppercased value or `null`. |

All validators trim and uppercase their input. Requires Node 18+ (full-ICU
`Intl` for `formatINR`).

## License

MIT
