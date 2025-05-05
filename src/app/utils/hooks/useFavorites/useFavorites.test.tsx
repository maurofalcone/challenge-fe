import { renderHook } from "@testing-library/react";
import { useFavorites } from ".";

import { vi } from "vitest";
import { FavoritesContext } from "@/app/components/global/contexts/FavoritesProvider";

const favoriteItem = {
  id: "28193210",
  email: "maurofalcone.95@gmail.com",
  image: "/test-url",
  username: "mauro_falcone",
  firstName: "Mauro",
  age: 20,
  birthDate: "1995-03-29",
  gender: "male",
};

const mockContextValue = {
  favorites: [favoriteItem],
  getAllFavorites: vi.fn().mockReturnValue([favoriteItem]),
  toggleFavorite: vi.fn(),
  isFavorite: vi.fn().mockReturnValue(true),
};

describe("useFavorites", () => {
  it("should return the context value when inside the provider", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <FavoritesContext.Provider value={mockContextValue}>
        {children}
      </FavoritesContext.Provider>
    );

    const { result } = renderHook(() => useFavorites(), { wrapper });

    expect(result.current).toBe(mockContextValue);
    expect(result.current.getAllFavorites().length).toBe(1);
    expect(result.current.isFavorite("28193210")).toBe(true);
    expect(result.current.getAllFavorites()).toEqual([
      {
        id: "28193210",
        email: "maurofalcone.95@gmail.com",
        image: "/test-url",
        username: "mauro_falcone",
        firstName: "Mauro",
        age: 20,
        birthDate: "1995-03-29",
        gender: "male",
      },
    ]);
  });

  it("should throw error when used outside of provider", () => {
    expect(() => renderHook(() => useFavorites())).toThrow(
      "useFavorites must be used within a FavoritesProvider"
    );
  });
});
