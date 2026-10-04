import { describe, expect, it } from "vitest";
import { isValidGSTIN, normalizeGSTIN, panFromGSTIN } from "../src/index.js";

const VALID = "27AAPFU0939F1ZV"; // checksum verified by hand

describe("isValidGSTIN", () => {
  it("accepts a GSTIN with a correct checksum", () => {
    expect(isValidGSTIN(VALID)).toBe(true);
    expect(isValidGSTIN(VALID.toLowerCase())).toBe(true);
  });

  it("rejects a wrong checksum", () => {
    expect(isValidGSTIN("27AAPFU0939F1ZX")).toBe(false);
  });

  it("rejects bad state codes", () => {
    expect(isValidGSTIN("00AAPFU0939F1ZV")).toBe(false);
    expect(isValidGSTIN("50AAPFU0939F1ZV")).toBe(false);
  });

  it("rejects bad shapes", () => {
    expect(isValidGSTIN("27AAPFU0939F1AV")).toBe(false); // 14th char must be Z
    expect(isValidGSTIN("27AAPFU0939F1Z")).toBe(false); // too short
    expect(isValidGSTIN("")).toBe(false);
  });

  it("extracts the embedded PAN", () => {
    expect(panFromGSTIN(VALID)).toBe("AAPFU0939F");
    expect(panFromGSTIN("27AAPFU0939F1ZX")).toBeNull();
  });

  it("normalizes or returns null", () => {
    expect(normalizeGSTIN(` ${VALID.toLowerCase()} `)).toBe(VALID);
    expect(normalizeGSTIN("garbage")).toBeNull();
  });
});
