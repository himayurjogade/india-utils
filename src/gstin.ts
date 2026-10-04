import { isValidPAN } from "./pan.js";

// 2-digit state + 10-char PAN + entity number + 'Z' + checksum
const GSTIN_RE = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][0-9A-Z]Z[0-9A-Z]$/;
const CHARS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

/** Valid GST state codes: 01-38, plus 97 (other territory) and 99 (centre). */
function isValidStateCode(code: string): boolean {
  const n = Number(code);
  return (n >= 1 && n <= 38) || n === 97 || n === 99;
}

/** Mod-36 weighted checksum over the first 14 characters. */
function gstinChecksum(first14: string): string {
  let sum = 0;
  for (let i = 0; i < 14; i++) {
    const product = CHARS.indexOf(first14[i]) * (i % 2 === 0 ? 1 : 2);
    sum += Math.floor(product / 36) + (product % 36);
  }
  return CHARS[(36 - (sum % 36)) % 36];
}

export function isValidGSTIN(value: string): boolean {
  const v = value.trim().toUpperCase();
  if (!GSTIN_RE.test(v)) return false;
  if (!isValidStateCode(v.slice(0, 2))) return false;
  if (!isValidPAN(v.slice(2, 12))) return false;
  return gstinChecksum(v.slice(0, 14)) === v[14];
}

export function normalizeGSTIN(value: string): string | null {
  const v = value.trim().toUpperCase();
  return isValidGSTIN(v) ? v : null;
}

/** The PAN embedded in a GSTIN, or null if the GSTIN is invalid. */
export function panFromGSTIN(value: string): string | null {
  const v = normalizeGSTIN(value);
  return v ? v.slice(2, 12) : null;
}
