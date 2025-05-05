import { formatGender, formatBirthDate } from "./";
import { Gender } from "../api/users/types";

describe("formatGender", () => {
  it("should return 'Masculino' for 'male'", () => {
    expect(formatGender("male")).toBe("Masculino");
  });

  it("should return 'Femenino' for 'female'", () => {
    expect(formatGender("female")).toBe("Femenino");
  });

  it("should return '-' for falsy input", () => {
    expect(formatGender(undefined as unknown as Gender)).toBe("-");
    expect(formatGender(null as unknown as Gender)).toBe("-");
    expect(formatGender("" as Gender)).toBe("-");
  });

  it("should return the original string for unknown values", () => {
    expect(formatGender("non-binary" as Gender)).toBe("non-binary");
  });
});

describe("formatBirthDate", () => {
  it("should format a valid YYYY-MM-DD date", () => {
    expect(formatBirthDate("1990-12-25")).toBe("25/12/1990");
  });

  it("should return 'NaN/undefined/undefined' for malformed input", () => {
    expect(formatBirthDate("invalid-date")).toBe("-");
  });
});
