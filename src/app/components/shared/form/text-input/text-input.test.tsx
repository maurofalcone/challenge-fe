import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import TextInput from "./";

describe("TextInput", () => {
  it("renders an input with given props", () => {
    render(<TextInput placeholder="Your name" id="name-input" />);
    const input = screen.getByPlaceholderText("Your name");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("id", "name-input");
  });

  it("applies the correct class from CSS module", () => {
    render(<TextInput placeholder="Test" />);
    const input = screen.getByPlaceholderText("Test");
    expect(input.className).toMatch(/root/); // You can refine this if `styles.root` is mocked
  });
});
