import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import * as Mod from '../pages/Intention.jsx';

function renderWithRouter(ui) { return render(<BrowserRouter>{ui}</BrowserRouter>); }

describe('Intention duplicate — affiner', () => {
  it('ajoute une entrée combinée avec approfondissement', async () => {
    localStorage.clear();
    const promptSpy = vi.spyOn(window, 'prompt').mockReturnValue('Parce que… premier pas : 10 minutes.');
    renderWithRouter(<Mod.default />);
    const input = screen.getByPlaceholderText(/Avancer calmement/i);
    await userEvent.type(input, 'Focus{enter}');
    await userEvent.type(input, 'focus{enter}');
    const refine = screen.getByRole('button', { name: /Affiner/i });
    await userEvent.click(refine);
    promptSpy.mockRestore();
    // On doit voir la ligne enrichie
    expect(screen.getByText('Focus')).toBeInTheDocument();
    expect(screen.getByText(/Parce que… premier pas/i)).toBeInTheDocument();
  });
});