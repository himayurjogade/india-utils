import { describe, expect, it } from "vitest";
import { isValidVehicleRegistration, normalizeVehicleRegistration } from "../src/index.js";

describe("isValidVehicleRegistration", () => {
  it("accepts real-shaped standard plates", () => {
    expect(isValidVehicleRegistration("MH12AB1234")).toBe(true);
    expect(isValidVehicleRegistration("DL8CAF5678")).toBe(true);
    expect(isValidVehicleRegistration("mh 12 ab 1234")).toBe(true);
    expect(isValidVehicleRegistration("MH-12-AB-1234")).toBe(true);
  });

  it("accepts BH-series plates", () => {
    expect(isValidVehicleRegistration("23BH1234AB")).toBe(true);
    expect(isValidVehicleRegistration("23 BH 1234 A")).toBe(true);
  });

  it("rejects bad shapes", () => {
    expect(isValidVehicleRegistration("MH1AB123")).toBe(false); // too few digits
    expect(isValidVehicleRegistration("M12AB1234")).toBe(false); // only 1 state letter
    expect(isValidVehicleRegistration("")).toBe(false);
  });

  it("normalizes or returns null", () => {
    expect(normalizeVehicleRegistration("mh 12 ab 1234")).toBe("MH12AB1234");
    expect(normalizeVehicleRegistration("nope")).toBeNull();
  });
});
