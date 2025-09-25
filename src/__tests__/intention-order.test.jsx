import { describe, it, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import Intention from "../pages/Intention.jsx";

function renderWithRouter(ui) {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
}

describe("Intention order", () => {
  it("place la plus récente en premier", async () => {
    localStorage.clear();
    renderWithRouter(<Intention />);

    const input = screen.getByPlaceholderText(/Ex: Avancer calmement 1h sur NSEO/i);
    await userEvent.type(input, "Première{enter}");
    await userEvent.type(input, "Deuxième{enter}");

    const items = screen.getAllByRole("listitem");
    expect(within(items[0]).getByText("Deuxième")).toBeInTheDocument();
  });
});