import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Root from '../Root.jsx';

describe('Root smoke', () => {
  it('rend la navbar et le lien Intention', () => {
    render(
      <MemoryRouter>
        <Root />
      </MemoryRouter>
    );
    expect(screen.getByRole('link', { name: /Intention/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Accueil/i })).toBeInTheDocument();
  });
});