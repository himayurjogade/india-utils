import { describe, expect, it } from "vitest";
import { isValidIFSC, normalizeIFSC } from "../src/index.js";

describe("isValidIFSC", () => {
  it("accepts real-shaped codes", () => {
    expect(isValidIFSC("HDFC0001234")).toBe(true);
    expect(isValidIFSC("SBIN0000001")).toBe(true);
    expect(isValidIFSC(" hdfc0001234 ")).toBe(true); // trimmed + uppercased
  });

  it("rejects bad shapes", () => {
    expect(isValidIFSC("HDFC1001234")).toBe(false); // 5th char must be 0
    expect(isValidIFSC("HDF00001234")).toBe(false); // only 3 bank letters
    expect(isValidIFSC("HDFC000123")).toBe(false); // too short
    expect(isValidIFSC("")).toBe(false);
  });

  it("normalizes or returns null", () => {
    expect(normalizeIFSC("hdfc0001234")).toBe("HDFC0001234");
    expect(normalizeIFSC("nope")).toBeNull();
  });
});
