import { describe, expect, it } from "vitest";
import { isValidAadhaar, maskAadhaar, normalizeAadhaar, verhoeffCheckDigit } from "../src/index.js";

/** A valid 12-digit Aadhaar built from an 11-digit payload. */
function make(payload: string): string {
  return payload + verhoeffCheckDigit(payload);
}

/** Deterministic PRNG so a failure is always reproducible. */
function rng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    return s / 0x7fffffff;
  };
}

function samples(count: number): string[] {
  const rand = rng(42);
  const out: string[] = [];
  for (let n = 0; n < count; n++) {
    let payload = String(2 + Math.floor(rand() * 8)); // first digit 2-9
    for (let i = 0; i < 10; i++) payload += Math.floor(rand() * 10);
    out.push(make(payload));
  }
  return out;
}

describe("Verhoeff checksum", () => {
  it("accepts every number it generates", () => {
    for (const n of samples(500)) expect(isValidAadhaar(n)).toBe(true);
  });

  // Verhoeff's defining guarantee. A single wrong cell in the D or P table
  // breaks this, so it is the real check that the tables are correct.
  it("detects 100% of single-digit errors", () => {
    for (const n of samples(200)) {
      for (let i = 0; i < 12; i++) {
        const lo = i === 0 ? 2 : 0; // keep the first digit in its legal 2-9 range
        for (let d = lo; d <= 9; d++) {
          if (String(d) === n[i]) continue;
          const bad = n.slice(0, i) + d + n.slice(i + 1);
          expect(isValidAadhaar(bad), `${n} -> ${bad}`).toBe(false);
        }
      }
    }
  });

  // The other half of the guarantee, and the reason Verhoeff beats a plain
  // mod-10 sum: swapping neighbours must never pass.
  it("detects 100% of adjacent transpositions", () => {
    for (const n of samples(200)) {
      for (let i = 0; i < 11; i++) {
        if (n[i] === n[i + 1]) continue; // a swap of equal digits is not an error
        if (i === 0 && (n[1] === "0" || n[1] === "1")) continue; // would break format, not checksum
        const bad = n.slice(0, i) + n[i + 1] + n[i] + n.slice(i + 2);
        expect(isValidAadhaar(bad), `${n} -> ${bad}`).toBe(false);
      }
    }
  });
});

describe("isValidAadhaar", () => {
  it("accepts spaced and hyphenated input", () => {
    const n = samples(1)[0];
    const spaced = `${n.slice(0, 4)} ${n.slice(4, 8)} ${n.slice(8)}`;
    expect(isValidAadhaar(spaced)).toBe(true);
    expect(isValidAadhaar(spaced.replace(/ /g, "-"))).toBe(true);
  });

  it("rejects bad shapes", () => {
    expect(isValidAadhaar("12345678901")).toBe(false); // 11 digits
    expect(isValidAadhaar("1234567890123")).toBe(false); // 13 digits
    expect(isValidAadhaar("12345678901a")).toBe(false); // not all digits
    expect(isValidAadhaar("")).toBe(false);
  });

  it("rejects numbers starting 0 or 1", () => {
    for (const first of ["0", "1"]) {
      const n = make(first + samples(1)[0].slice(1, 11));
      expect(n[0]).toBe(first);
      expect(isValidAadhaar(n)).toBe(false); // checksum is fine; the prefix is not
    }
  });
});

describe("normalizeAadhaar / maskAadhaar", () => {
  it("normalizes or returns null", () => {
    const n = samples(1)[0];
    expect(normalizeAadhaar(`${n.slice(0, 4)} ${n.slice(4, 8)} ${n.slice(8)}`)).toBe(n);
    expect(normalizeAadhaar("123456789012")).toBeNull(); // bad checksum
  });

  it("masks all but the last four digits", () => {
    const n = samples(1)[0];
    expect(maskAadhaar(n)).toBe(`XXXX XXXX ${n.slice(8)}`);
    expect(maskAadhaar("123456789012")).toBeNull();
  });
});
