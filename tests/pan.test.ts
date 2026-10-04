import { describe, expect, it } from "vitest";
import { isValidPAN, normalizePAN } from "../src/index.js";

describe("isValidPAN", () => {
  it("accepts valid PANs", () => {
    expect(isValidPAN("ABCPV1234D")).toBe(true); // P = individual
    expect(isValidPAN("AAACH7409R")).toBe(true); // C = company
    expect(isValidPAN(" abcpv1234d ")).toBe(true);
  });

  it("rejects bad shapes and bad entity types", () => {
    expect(isValidPAN("ABCDV1234D")).toBe(false); // D is not an entity type
    expect(isValidPAN("ABCP12345D")).toBe(false); // digit in letter slot
    expect(isValidPAN("ABCPV1234")).toBe(false); // missing check letter
    expect(isValidPAN("ABCPV12345")).toBe(false); // digit in last slot
  });

  it("normalizes or returns null", () => {
    expect(normalizePAN("abcpv1234d")).toBe("ABCPV1234D");
    expect(normalizePAN("ABCDV1234D")).toBeNull();
  });
});
