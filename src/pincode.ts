// 6 digits; the first is the postal zone (1-8 civilian, 9 Army/Field Post Office).
const PINCODE_RE = /^[1-9][0-9]{5}$/;

/** Format-only check — does not confirm the PIN code is in use. */
export function isValidPincode(value: string): boolean {
  return PINCODE_RE.test(value.trim());
}

export function normalizePincode(value: string): string | null {
  const v = value.trim();
  return PINCODE_RE.test(v) ? v : null;
}
