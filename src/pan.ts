const PAN_RE = /^[A-Z]{5}[0-9]{4}[A-Z]$/;

/** 4th char = holder type. P=individual, C=company, H=HUF, F=firm, etc. */
const ENTITY_TYPES = new Set("ABCFGHJLPTEK".split(""));

export function isValidPAN(value: string): boolean {
  const v = value.trim().toUpperCase();
  return PAN_RE.test(v) && ENTITY_TYPES.has(v[3]);
}

export function normalizePAN(value: string): string | null {
  const v = value.trim().toUpperCase();
  return isValidPAN(v) ? v : null;
}
