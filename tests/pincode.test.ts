import { describe, expect, it } from "vitest";
import { isValidPincode, normalizePincode } from "../src/index.js";

describe("isValidPincode", () => {
  it("accepts real PIN codes", () => {
    expect(isValidPincode("110001")).toBe(true); // Delhi
    expect(isValidPincode("400001")).toBe(true); // Mumbai
    expect(isValidPincode("900001")).toBe(true); // zone 9 = Army Post Office
    expect(isValidPincode(" 560001 ")).toBe(true);
  });

  it("rejects bad shapes", () => {
    expect(isValidPincode("010001")).toBe(false); // zone 0 does not exist
    expect(isValidPincode("11000")).toBe(false); // 5 digits
    expect(isValidPincode("1100011")).toBe(false); // 7 digits
    expect(isValidPincode("11000a")).toBe(false);
    expect(isValidPincode("")).toBe(false);
  });

  it("normalizes or returns null", () => {
    expect(normalizePincode(" 110001 ")).toBe("110001");
    expect(normalizePincode("010001")).toBeNull();
  });
});
