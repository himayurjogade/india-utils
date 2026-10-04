const IFSC_RE = /^[A-Z]{4}0[A-Z0-9]{6}$/;

/** Format-only check: 4 bank letters, a literal 0, then 6 branch chars. */
export function isValidIFSC(value: string): boolean {
  return IFSC_RE.test(value.trim().toUpperCase());
}

/** "hdfc0001234" -> "HDFC0001234". Returns null if not a valid IFSC. */
export function normalizeIFSC(value: string): string | null {
  const v = value.trim().toUpperCase();
  return IFSC_RE.test(v) ? v : null;
}
