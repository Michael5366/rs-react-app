import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import CardList from './CardList';
import type {
  EpisodeCardData,
  RickAndMortyAPIEpisode,
} from '../../types/interfaces';

describe('CardList component', () => {
  it('renders the card list section with episode data', () => {
    const rawData: RickAndMortyAPIEpisode[] = [
      {
        id: 1,
        name: 'Pilot',
        air_date: 'December 2, 2013',
        episode: 'S01E01',
        characters: [],
        url: 'https://rickandmortyapi.com/api/episode/1',
        created: '2017-11-10T12:56:33.798Z',
      },
      {
        id: 2,
        name: 'Lawnmower Dog',
        air_date: 'December 9, 2013',
        episode: 'S01E02',
        characters: [],
        url: 'https://rickandmortyapi.com/api/episode/2',
        created: '2017-11-10T12:56:33.916Z',
      },
    ];

    const data: EpisodeCardData[] = rawData.map((episode) => ({
      id: episode.id,
      itemHeader: 'Episode',
      title: episode.name,
      desHeader: 'Air Date & Code',
      description: `${episode.air_date} — ${episode.episode}`,
    }));

    const loading = false;
    const error = '';

    render(<CardList data={data} loading={loading} error={error} />);

    const section = screen.getByTestId('cardListSection');
    expect(section).toBeInTheDocument();

    expect(screen.getByText('Pilot')).toBeInTheDocument();
    expect(screen.getByText('Lawnmower Dog')).toBeInTheDocument();

    expect(screen.getByText('December 2, 2013 — S01E01')).toBeInTheDocument();
    expect(screen.getByText('December 9, 2013 — S01E02')).toBeInTheDocument();
  });

  it('renders error message when error is present', () => {
    const data: EpisodeCardData[] = [];
    const loading = false;
    const error = 'Some error';

    render(<CardList data={data} loading={loading} error={error} />);

    expect(screen.getByText('Some error')).toBeInTheDocument();
  });
});
