import { describe, it, expect } from "vitest";
import { buildUrl } from "@/app/utils/api"; // ajustá el path si es necesario

describe("buildUrl", () => {
  const baseUrl = "https://example.com";
  const endpoint = "/users";

  it("should return full URL without params", () => {
    const result = buildUrl(baseUrl, endpoint);
    expect(result).toBe("https://example.com/users");
  });

  it("should append query parameters correctly", () => {
    const result = buildUrl(baseUrl, endpoint, {
      search: "john",
      limit: 10,
      skip: 0,
    });

    expect(result).toContain("https://example.com/users?");
    expect(result).toContain("search=john");
    expect(result).toContain("limit=10");
    expect(result).toContain("skip=0");
  });

  it("should skip falsy values but allowing 0", () => {
    const result = buildUrl(baseUrl, endpoint, {
      search: null,
      skip: undefined,
      limit: 10,
      sort: null,
      sortyBy: "",
    });

    expect(result).toBe("https://example.com/users?limit=10");
  });

  it("should handle endpoint without leading slash", () => {
    const result = buildUrl(baseUrl, "users");
    expect(result).toBe("https://example.com/users");
  });

  it("should handle baseUrl with trailing slash", () => {
    const result = buildUrl("https://example.com/", "/users");
    expect(result).toBe("https://example.com/users");
  });
});
