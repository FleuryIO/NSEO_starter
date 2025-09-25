import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import Intention from "../pages/Intention.jsx";

function renderWithRouter(ui) {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
}

describe("Intention page", () => {
  it("affiche le placeholder et ajoute une intention", async () => {
    localStorage.clear();
    renderWithRouter(<Intention />);

    const input = screen.getByPlaceholderText(/Ex: Avancer calmement 1h sur NSEO/i);
    await userEvent.type(input, "Tester l'ajout d'une intention{enter}");

    expect(screen.getByText("Tester l'ajout d'une intention")).toBeInTheDocument();
  });

  it("bouton enregistre fonctionne aussi", async () => {
    localStorage.clear();
    renderWithRouter(<Intention />);

    const input = screen.getByPlaceholderText(/Ex: Avancer calmement 1h sur NSEO/i);
    await userEvent.type(input, "Via le bouton");

    const btn = screen.getByRole("button", { name: /Enregistrer/i });
    await userEvent.click(btn);

    expect(screen.getByText("Via le bouton")).toBeInTheDocument();
  });
});