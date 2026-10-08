# india-utils

Validate and format Indian identifiers: PAN, GSTIN, Aadhaar, IFSC, PIN code,
UPI and vehicle registration, plus rupee amounts in lakh/crore grouping.

**No dependencies. 5.6 kB packed. ESM, CJS and TypeScript types included.**

```bash
npm i india-utils
```

```ts
import { isValidGSTIN, isValidAadhaar, formatINR } from "india-utils";

isValidGSTIN("27AAPFU0939F1ZV"); // true (format + mod-36 checksum)
isValidAadhaar("2345 6789 0124"); // true (format + Verhoeff checksum)
formatINR(1234567); // "₹12,34,567"
```

## Why

Most "Indian validation" snippets are a regex that checks the shape and stops
there. GSTIN and Aadhaar both carry real check digits, so a typo like
`27AAPFU0939F1ZX` or a transposed Aadhaar digit passes a regex and fails here.
That's the difference between catching it at the form and discovering it in
your database three months later.

## Validators

Each returns a plain `boolean` and tolerates surrounding whitespace,
lowercase, and for Aadhaar the spaces or hyphens people type.

| Function | Checks | Checksum |
|---|---|:-:|
| `isValidPAN(s)` | 5 letters, 4 digits, 1 letter, and a valid entity-type character | none |
| `isValidGSTIN(s)` | State code, embedded PAN, structure, and the 15th check character | mod-36 |
| `isValidAadhaar(s)` | 12 digits, never starting 0 or 1, and the 12th check digit | Verhoeff |
| `isValidIFSC(s)` | 4 bank letters, a literal `0`, 6 branch characters | none |
| `isValidPincode(s)` | 6 digits, first being a real postal zone | none |
| `isValidUPI(s)` | `local-part@handle` | none |
| `isValidVehicleRegistration(s)` | State code, RTO code and series, or the newer BH series | none |

PAN, IFSC, PIN code, UPI and vehicle registration have no public checksum, so
those are shape checks by definition, not a shortcut taken here.

```ts
isValidPAN("ABCPV1234D"); // true
isValidPAN("ABCDV1234D"); // false (D is not an entity type)
isValidIFSC("HDFC0001234"); // true
isValidPincode("110001"); // true
isValidPincode("010001"); // false (there is no postal zone 0)
isValidUPI("9876543210@ybl"); // true
isValidVehicleRegistration("MH12AB1234"); // true
```

## Normalizers

Each returns the cleaned-up value, or `null` if the input is invalid, so one
call both validates and gives you the form you want to store.

```ts
import { normalizePAN, normalizeAadhaar, normalizeUPI } from "india-utils";

normalizePAN(" abcpv1234d "); // "ABCPV1234D"
normalizeAadhaar("2345-6789-0124"); // "234567890124"
normalizeUPI(" Mayur@OkAxis "); // "mayur@okaxis"
normalizePAN("not a pan"); // null
```

`normalizeIFSC`, `normalizeGSTIN`, `normalizePincode` and
`normalizeVehicleRegistration` work the same way.

## Formatting and helpers

```ts
import { formatINR, maskAadhaar, panFromGSTIN, verhoeffCheckDigit } from "india-utils";

formatINR(1234567); // "₹12,34,567"
formatINR(10000000); // "₹1,00,00,000"   (1 crore)
formatINR(1234567, { symbol: false }); // "12,34,567"
formatINR(1234.5, { decimals: 2 }); // "₹1,234.50"

maskAadhaar("234567890124"); // "XXXX XXXX 0124"  (safe for logs and UI)
panFromGSTIN("27AAPFU0939F1ZV"); // "AAPFU0939F"
verhoeffCheckDigit("23456789012"); // "4" (useful for generating test data)
```

`formatINR` throws a `RangeError` on `NaN` or `Infinity` rather than quietly
rendering `"₹NaN"`.

## What this does not do

**A `true` means well-formed, not real.** The identifier's structure and
checksum hold; whether it was ever issued, and to whom, is a different
question that needs the relevant government API.

Specifically:

- `isValidIFSC` does not confirm the branch exists
- `isValidPincode` does not confirm the PIN code is in use
- `isValidUPI` does not confirm the VPA is registered. NPCI
  publishes no character-set or length spec, this check is deliberately
  permissive; wrongly rejecting a real VPA is the worse failure
- `isValidVehicleRegistration` does not confirm the vehicle exists or that
  the state code is a real one
- Aadhaar encodes no date of birth, gender or location, so nothing here
  extracts any

## Notes

Only `index.ts` defines the public API; everything else is internal. The
package sets `"sideEffects": false`, so importing one validator lets bundlers drop the
rest.

Requires Node 18+ (`formatINR` relies on `Intl` support for `en-IN`).

Bug reports and PRs: <https://github.com/himayurjogade/india-utils/issues>

## License

MIT © Mayur Jogade
