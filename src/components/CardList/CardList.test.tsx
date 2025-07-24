import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import CardList from './CardList';
import type { FilmData } from '../../types/interfaces';

describe('CardList component', () => {
  it('renders the card list section', () => {
    const data: FilmData[] | null = [
      { title: 'One', opening_crawl: 'Description One' },
      { title: 'Two', opening_crawl: 'Description Two' },
    ];
    const loading = false;
    const error = '';

    render(<CardList data={data} loading={loading} error={error} />);

    const section = screen.getByTestId('cardListSection');
    expect(section).toBeInTheDocument();

    expect(screen.getByText('One')).toBeInTheDocument();
    expect(screen.getByText('Two')).toBeInTheDocument();
    expect(screen.getByText('Description One')).toBeInTheDocument();
    expect(screen.getByText('Description Two')).toBeInTheDocument();
  });

  it('renders error message when error is present', () => {
    const data: FilmData[] | null = [];
    const loading = false;
    const error = 'Some error';

    render(<CardList data={data} loading={loading} error={error} />);

    expect(screen.getByText('Some error')).toBeInTheDocument();
  });
});
