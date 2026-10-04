import { describe, expect, it } from "vitest";
import { formatINR } from "../src/index.js";

describe("formatINR", () => {
  it("groups in lakhs and crores", () => {
    expect(formatINR(1234567)).toBe("₹12,34,567");
    expect(formatINR(100000)).toBe("₹1,00,000");
    expect(formatINR(10000000)).toBe("₹1,00,00,000");
    expect(formatINR(999)).toBe("₹999");
    expect(formatINR(0)).toBe("₹0");
  });

  it("honours options", () => {
    expect(formatINR(1234567, { symbol: false })).toBe("12,34,567");
    expect(formatINR(1234.5, { decimals: 2 })).toBe("₹1,234.50");
  });

  it("rounds to the requested precision", () => {
    expect(formatINR(1234.56)).toBe("₹1,235");
  });

  it("throws on non-finite input", () => {
    expect(() => formatINR(Number.NaN)).toThrow(RangeError);
    expect(() => formatINR(Number.POSITIVE_INFINITY)).toThrow(RangeError);
  });
});
