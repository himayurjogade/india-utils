// Standard format: 2-letter state, 1-2 digit RTO code, 1-3 letter series, 4 digits.
const STANDARD_RE = /^[A-Z]{2}[0-9]{1,2}[A-Z]{1,3}[0-9]{4}$/;
// BH series (2021+): 2-digit year, literal BH, 4 digits, 1-2 letter suffix.
const BH_RE = /^[0-9]{2}BH[0-9]{4}[A-Z]{1,2}$/;

function clean(value: string): string {
  return value.trim().toUpperCase().replace(/[\s-]/g, "");
}

/** Format-only check: does not confirm the vehicle is registered. */
export function isValidVehicleRegistration(value: string): boolean {
  const v = clean(value);
  return STANDARD_RE.test(v) || BH_RE.test(v);
}

/** "mh 12 ab 1234" -> "MH12AB1234". Returns null if not a valid shape. */
export function normalizeVehicleRegistration(value: string): string | null {
  const v = clean(value);
  return isValidVehicleRegistration(v) ? v : null;
}
