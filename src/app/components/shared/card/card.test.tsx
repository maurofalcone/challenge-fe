import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Card from ".";

// Mockeo next/image para que no rompa el entorno del test.
vi.mock("next/image", () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  default: (props: any) => {
    return <img {...props} />;
  },
}));

describe("Card", () => {
  const props = {
    src: "/user-image.jpg",
    alt: "User Profile Image",
  };

  it("renders the image with given src and alt", () => {
    render(<Card {...props}></Card>);

    const img = screen.getByAltText("User Profile Image") as HTMLImageElement;
    expect(img).toBeInTheDocument();
    expect(img.src).toContain("/user-image.jpg");
  });

  it("renders children correctly", () => {
    render(
      <Card {...props}>
        <span>Juan Perez</span>
        <p>juan@email.com</p>
      </Card>
    );
    expect(screen.getByText("Juan Perez")).toBeInTheDocument();
    expect(screen.getByText("juan@email.com")).toBeInTheDocument();
  });
});
