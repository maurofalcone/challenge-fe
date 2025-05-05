import { describe, it, expect, vi, beforeEach } from "vitest";
import { fetchUsers, MappedUserReturnType } from ".";

const mockUser = {
  id: 1,
  email: "test@example.com",
  firstName: "John",
  image: "https://image.jpg",
  username: "johnny",
  phone: "123456789",
  age: 30,
  birthDate: "1990-05-10",
  gender: "male",
};

describe("fetchUsers", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("should fetch and return mapped user data", async () => {
    process.env.NEXT_PUBLIC_API_URL = "https://test_url.com";
    const fakeResponse = {
      users: [mockUser],
      total: 1,
    };

    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(fakeResponse),
      })
    ) as unknown as typeof fetch;

    const result = await fetchUsers({ skip: 0, limit: 1 });

    expect(fetch).toHaveBeenCalled();
    expect(result.data[0]).toMatchObject<MappedUserReturnType>({
      uuid: "1",
      email: "test@example.com",
      firstName: "John",
      image: "https://image.jpg",
      username: "johnny",
      phone: "123456789",
      age: 30,
      birthDate: "10/05/1990",
      gender: "Masculino",
    });
    expect(result.meta.total).toBe(1);
  });

  it("should catch errors and return empty data", async () => {
    global.fetch = vi.fn(() => Promise.reject("Network error"));

    const result = await fetchUsers({ skip: 0, limit: 1 });

    expect(result.data).toEqual([]);
    expect(result.meta.total).toBe(0);
  });
});
