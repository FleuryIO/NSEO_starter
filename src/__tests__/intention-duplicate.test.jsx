import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import * as Mod from '../pages/Intention.jsx';

function renderWithRouter(ui) { return render(<BrowserRouter>{ui}</BrowserRouter>); }

describe('Intention duplicate (A)', () => {
  it('détecte un doublon consécutif après normalisation et ouvre le toast', async () => {
    localStorage.clear();
    renderWithRouter(<Mod.default />);
    const input = screen.getByPlaceholderText(/Avancer calmement/i);
    await userEvent.type(input, '  Avancer   calmement  1h  {enter}');
    await userEvent.type(input, 'avancer calmement 1h{enter}');
    expect(screen.getByRole('button', { name: /Affiner/i })).toBeInTheDocument();
  });
});