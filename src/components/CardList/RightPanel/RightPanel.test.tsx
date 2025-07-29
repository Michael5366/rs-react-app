import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RightPanel from './RightPanel';
import fetchData from '../../../api/swapiService';
import { MemoryRouter } from 'react-router-dom';
import type { RickAndMortyAPIEpisode } from '../../../types/interfaces';

vi.mock('../../../api/swapiService');

describe('RightPanel', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should show a spinner and then display episode details on successful fetch', async () => {
    const apiResponse: RickAndMortyAPIEpisode = {
      id: 1,
      name: 'Pilot',
      air_date: 'December 2, 2013',
      episode: 'S01E01',
      characters: [],
      url: '',
      created: '',
    };

    vi.mocked(fetchData).mockResolvedValue(apiResponse);

    render(
      <MemoryRouter initialEntries={['/?details=1']}>
        <RightPanel />
      </MemoryRouter>
    );

    const spinner = screen.getByRole('status');
    expect(spinner).toBeInTheDocument();

    const itemName = await screen.findByText('Pilot');
    const episodeDate = await screen.findByText('S01E01 — December 2, 2013');
    expect(itemName).toBeInTheDocument();
    expect(episodeDate).toBeInTheDocument();

    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  it('should show an error message if the fetch fails', async () => {
    vi.mocked(fetchData).mockRejectedValue(new Error('Network error'));

    render(
      <MemoryRouter initialEntries={['/?details=1']}>
        <RightPanel />
      </MemoryRouter>
    );

    expect(screen.getByRole('status')).toBeInTheDocument();

    const errorText = await screen.findByText(/network error/i);
    expect(errorText).toBeInTheDocument();

    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  it('should render nothing if "details" search param is not provided', () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/']}>
        <RightPanel />
      </MemoryRouter>
    );

    expect(container).toBeEmptyDOMElement();
  });

  it('renders spinner, loads episode data, and closes panel on Close click', async () => {
    const user = userEvent.setup();

    const apiResponse: RickAndMortyAPIEpisode = {
      id: 1,
      name: 'Pilot',
      air_date: 'December 2, 2013',
      episode: 'S01E01',
      characters: [],
      url: '',
      created: '',
    };

    vi.mocked(fetchData).mockResolvedValue(apiResponse);

    render(
      <MemoryRouter initialEntries={['/?details=1']}>
        <RightPanel />
      </MemoryRouter>
    );

    expect(screen.getByRole('status')).toBeInTheDocument();

    const buttonClose = await screen.findByRole('button', { name: 'Close' });
    expect(buttonClose).toBeInTheDocument();

    await user.click(buttonClose);
    expect(screen.queryByText('Episode Description')).not.toBeInTheDocument();
  });
});
