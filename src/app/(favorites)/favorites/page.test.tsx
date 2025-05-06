import { render, screen } from "@testing-library/react";
import Favorites from "./page"; // o el path relativo según tu estructura
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

// Mockeo user card para no hacer testing too deep ya que el componente tiene su propio test.
vi.mock("../../(users)/user-card", () => ({
  default: ({ username }: { username: string }) => (
    <div data-testid="user-card">{username}</div>
  ),
}));

describe("Favorites Page", () => {
  const mockFavorites = [favoriteItem];

  const mockContextValue = {
    favorites: mockFavorites,
    getAllFavorites: vi.fn().mockReturnValue([favoriteItem]),
    toggleFavorite: vi.fn(),
    isFavorite: vi.fn(),
  };

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <FavoritesContext.Provider value={mockContextValue}>
      {children}
    </FavoritesContext.Provider>
  );

  it("should render favorites and user cards", () => {
    render(<Favorites />, { wrapper });

    expect(screen.getByText("Atras")).toBeInTheDocument();
    expect(screen.getByTestId("user-card")).toHaveTextContent("mauro_falcone");
  });
});
