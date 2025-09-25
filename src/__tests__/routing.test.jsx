import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import Root from "../Root.jsx";

describe("Routing", () => {
  it("navigue vers /intention via la navbar", async () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Root />
      </MemoryRouter>
    );

    const link = screen.getByRole("link", { name: /Intention/i });
    await userEvent.click(link);

    expect(screen.getByPlaceholderText(/Ex: Avancer calmement 1h sur NSEO/i)).toBeInTheDocument();
  });
});