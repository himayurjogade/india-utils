// local-part@handle, e.g. "mayur@okaxis". NPCI publishes no publicly documented
// character set or length limit, so this stays permissive on purpose: wrongly
// rejecting a real VPA is worse than accepting a malformed one.
const UPI_RE = /^[a-zA-Z0-9][a-zA-Z0-9.\-_]{1,255}@[a-zA-Z][a-zA-Z0-9]{1,63}$/;

/** Format-only check. A UPI ID has no checksum and this does not confirm it exists. */
export function isValidUPI(value: string): boolean {
  return UPI_RE.test(value.trim());
}

/** Lowercased and trimmed, since VPAs are case-insensitive. Null if invalid. */
export function normalizeUPI(value: string): string | null {
  const v = value.trim();
  return UPI_RE.test(v) ? v.toLowerCase() : null;
}
