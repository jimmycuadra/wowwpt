import { render, screen } from "@testing-library/react";

import Navigation from "./Navigation";

describe("Navigation", () => {
  it("displays the project title", () => {
    render(<Navigation />);

    const element = screen.getByText("World of Warcraft Weekly Progress Tracker");

    expect(element).toBeInTheDocument();
  });
});
