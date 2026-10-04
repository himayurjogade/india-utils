// Verhoeff checksum (Verhoeff 1969), the scheme UIDAI uses for the 12th digit.
// d = multiplication table for the dihedral group D5, p = permutation table.
const D = [
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  [1, 2, 3, 4, 0, 6, 7, 8, 9, 5],
  [2, 3, 4, 0, 1, 7, 8, 9, 5, 6],
  [3, 4, 0, 1, 2, 8, 9, 5, 6, 7],
  [4, 0, 1, 2, 3, 9, 5, 6, 7, 8],
  [5, 9, 8, 7, 6, 0, 4, 3, 2, 1],
  [6, 5, 9, 8, 7, 1, 0, 4, 3, 2],
  [7, 6, 5, 9, 8, 2, 1, 0, 4, 3],
  [8, 7, 6, 5, 9, 3, 2, 1, 0, 4],
  [9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
];

const P = [
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  [1, 5, 7, 6, 2, 8, 3, 0, 9, 4],
  [5, 8, 0, 3, 7, 9, 6, 1, 4, 2],
  [8, 9, 1, 6, 0, 4, 3, 5, 2, 7],
  [9, 4, 5, 3, 1, 2, 6, 8, 7, 0],
  [4, 2, 8, 6, 5, 7, 3, 9, 0, 1],
  [2, 7, 9, 3, 8, 0, 6, 4, 1, 5],
  [7, 0, 4, 6, 9, 1, 3, 2, 5, 8],
];

const INV = [0, 4, 3, 2, 1, 5, 6, 7, 8, 9];

/** True when the Verhoeff checksum of a digit string (check digit included) is valid. */
function verhoeffValid(digits: string): boolean {
  let c = 0;
  for (let i = digits.length - 1, j = 0; i >= 0; i--, j++) {
    c = D[c][P[j % 8][digits.charCodeAt(i) - 48]];
  }
  return c === 0;
}

/** The Verhoeff check digit for a payload that does not yet include one. */
export function verhoeffCheckDigit(payload: string): string {
  let c = 0;
  for (let i = payload.length - 1, j = 1; i >= 0; i--, j++) {
    c = D[c][P[j % 8][payload.charCodeAt(i) - 48]];
  }
  return String(INV[c]);
}

const AADHAAR_RE = /^[2-9][0-9]{11}$/;

/** Strips the spaces and hyphens people type: "1234 5678 9012" -> "123456789012". */
function strip(value: string): string {
  return value.replace(/[\s-]/g, "");
}

/**
 * 12 digits, never starting 0 or 1, with a Verhoeff check digit last.
 * Confirms the number is well-formed — not that it is issued to anyone.
 */
export function isValidAadhaar(value: string): boolean {
  const v = strip(value);
  return AADHAAR_RE.test(v) && verhoeffValid(v);
}

/** "1234 5678 9012" -> "123456789012". Returns null if not a valid Aadhaar. */
export function normalizeAadhaar(value: string): string | null {
  const v = strip(value);
  return isValidAadhaar(v) ? v : null;
}

/** "123456789012" -> "XXXX XXXX 9012". Returns null if not a valid Aadhaar. */
export function maskAadhaar(value: string): string | null {
  const v = normalizeAadhaar(value);
  return v ? `XXXX XXXX ${v.slice(8)}` : null;
}
