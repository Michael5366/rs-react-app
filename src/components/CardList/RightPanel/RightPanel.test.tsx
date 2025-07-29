import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RightPanel from './RightPanel';
import fetchData from '../../../api/swapiService';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import type { RickAndMortyAPIEpisode } from '../../../types/interfaces';

vi.mock('../../../api/swapiService');

describe('RightPanel', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const apiResponse: RickAndMortyAPIEpisode = {
    id: 1,
    name: 'Pilot',
    air_date: 'December 2, 2013',
    episode: 'S01E01',
    characters: [],
    url: '',
    created: '',
  };

  it('should show a spinner and then display episode details on successful fetch', async () => {
    vi.mocked(fetchData).mockResolvedValue(apiResponse);

    render(
      <MemoryRouter initialEntries={['/1']}>
        <Routes>
          <Route path="/:id" element={<RightPanel />} />
        </Routes>
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
      <MemoryRouter initialEntries={['/1']}>
        <Routes>
          <Route path="/:id" element={<RightPanel />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByRole('status')).toBeInTheDocument();

    const errorText = await screen.findByText(/network error/i);
    expect(errorText).toBeInTheDocument();

    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  it('should render nothing if "id" route param is not provided', () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/:id" element={<RightPanel />} />

          <Route path="/" element={null} />
        </Routes>
      </MemoryRouter>
    );

    expect(container).toBeEmptyDOMElement();
  });

  it('renders spinner, loads episode data, and closes panel on Close click', async () => {
    const user = userEvent.setup();

    vi.mocked(fetchData).mockResolvedValue(apiResponse);

    render(
      <MemoryRouter initialEntries={['/1']}>
        <Routes>
          <Route path="/:id" element={<RightPanel />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByRole('status')).toBeInTheDocument();

    const buttonClose = await screen.findByRole('button', { name: 'Close' });
    expect(buttonClose).toBeInTheDocument();

    await user.click(buttonClose);
    expect(screen.queryByText('Episode Description')).not.toBeInTheDocument();
  });
});
