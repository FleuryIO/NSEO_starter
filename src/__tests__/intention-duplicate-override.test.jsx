import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import * as Mod from '../pages/Intention.jsx';

function renderWithRouter(ui) { return render(<BrowserRouter>{ui}</BrowserRouter>); }

describe('Intention duplicate — garder quand même', () => {
  it('permet de forcer l\'ajout malgré le doublon', async () => {
    localStorage.clear();
    renderWithRouter(<Mod.default />);
    const input = screen.getByPlaceholderText(/Avancer calmement/i);
    await userEvent.type(input, 'Répéter{enter}');
    await userEvent.type(input, 'répéter{enter}');
    const keep = screen.getByRole('button', { name: /Garder quand même/i });
    await userEvent.click(keep);
    const items = screen.getAllByRole('listitem');
    expect(items.length).toBe(2);
  });
});