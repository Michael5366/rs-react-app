import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AboutPage from './AboutPage';

describe('AboutPage', () => {
  it('renders heading', () => {
    render(
      <MemoryRouter>
        <AboutPage />
      </MemoryRouter>
    );

    const link = screen.getByRole('link', { name: 'Michael Elsky' });

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://github.com/Michael5366');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noreferrer');
  });
});
