import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import LeftPanel from './LeftPanel';
import type { EpisodeCardData } from '../../../types/interfaces';
import { MemoryRouter } from 'react-router-dom';

describe('LeftPanel', () => {
  it('render LeftPanel', () => {
    const item: EpisodeCardData = {
      id: 1,
      itemHeader: 'Header',
      title: 'text',
      desHeader: 'Header',
      description: 'Long text',
    };

    render(
      <MemoryRouter>
        <LeftPanel item={item} />
      </MemoryRouter>
    );

    const link = screen.getByRole('link', { name: 'text' });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href');
  });
});
