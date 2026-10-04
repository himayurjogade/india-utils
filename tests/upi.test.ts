import { describe, expect, it } from "vitest";
import { isValidUPI, normalizeUPI } from "../src/index.js";

describe("isValidUPI", () => {
  it("accepts common VPA shapes", () => {
    expect(isValidUPI("mayur@okaxis")).toBe(true);
    expect(isValidUPI("9876543210@ybl")).toBe(true);
    expect(isValidUPI("first.last@oksbi")).toBe(true);
    expect(isValidUPI("support-team@paytm")).toBe(true);
    expect(isValidUPI("a_b@upi")).toBe(true);
  });

  it("rejects bad shapes", () => {
    expect(isValidUPI("mayur")).toBe(false); // no handle
    expect(isValidUPI("mayur@")).toBe(false); // empty handle
    expect(isValidUPI("@okaxis")).toBe(false); // empty local part
    expect(isValidUPI("may ur@okaxis")).toBe(false); // space
    expect(isValidUPI("mayur@ok@axis")).toBe(false); // two @
    expect(isValidUPI(".mayur@okaxis")).toBe(false); // leading dot
    expect(isValidUPI("")).toBe(false);
  });

  it("lowercases on normalize", () => {
    expect(normalizeUPI(" Mayur@OkAxis ")).toBe("mayur@okaxis");
    expect(normalizeUPI("nope")).toBeNull();
  });
});
