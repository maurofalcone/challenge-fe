import { render, screen } from "@testing-library/react";
import UserCard from "../user-card";

const mockProps = {
  id: "1",
  name: "Test",
  url: "/img.jpg",
  email: "maurofalcone.95@gmail.com",
  username: "mauro_falcone",
  gender: "male",
  birthDate: "1990-01-01",
  age: 33,
};

vi.mock("@/app/components/shared/card", () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="card">{children}</div>
  ),
}));
vi.mock("@/app/components/shared/badge", () => ({
  default: ({
    label,
    description,
  }: {
    label: string;
    description: string | number;
  }) => (
    <div data-testid="badge">
      {label}: {description}
    </div>
  ),
}));
vi.mock("@/app/components/ui/buttons/favorite-button-wrapper", () => ({
  default: vi.fn(() => <button data-testid="favorite-button">Fav</button>),
}));

vi.mock("../../assets/email.svg", () => ({
  default: () => <svg data-testid="email-icon" />,
}));

describe("UserCard", () => {
  it("should render user data correctly", () => {
    render(<UserCard {...mockProps} />);

    expect(screen.getByText("Test")).toBeInTheDocument(); // name
    expect(screen.getByText("mauro_falcone")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /contact/i })).toHaveAttribute(
      "href",
      "mailto:maurofalcone.95@gmail.com"
    );
    expect(screen.getAllByTestId("badge")).toHaveLength(3);
    expect(screen.getByTestId("favorite-button")).toBeInTheDocument();
  });
});
