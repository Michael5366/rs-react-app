import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import fetchData from '../api/swapiService';
import { MemoryRouter } from 'react-router-dom';

vi.mock('../api/swapiService', () => ({
  default: vi.fn(),
}));

describe('App component', (): void => {
  const mockInitialData = {
    results: [],
    info: { pages: 1 },
  };

  const mockEpisode = {
    id: 1,
    name: 'Pilot',
    air_date: 'December 2, 2013',
    episode: 'S01E01',
    characters: [],
    url: 'https://rickandmortyapi.com/api/episode/1',
    created: '2017-11-10T12:56:33.798Z',
  };

  const mockEpisodesResponse = {
    results: [mockEpisode],
    info: { pages: 1 },
  };

  beforeEach((): void => {
    vi.clearAllMocks();
    localStorage.clear();
    vi.spyOn(Storage.prototype, 'setItem');
    vi.mocked(fetchData).mockResolvedValue(mockInitialData);
  });

  it('should fetch default episodes on initial render', async () => {
    vi.mocked(fetchData).mockResolvedValue(mockEpisodesResponse);

    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(fetchData).toHaveBeenCalledWith(
        'https://rickandmortyapi.com/api/episode/?page=1'
      );
    });

    expect(await screen.findByText('Pilot')).toBeInTheDocument();
  });

  it('should load saved search term from localStorage and fetch filtered episodes', async () => {
    localStorage.setItem('searchTerm', 'Pilot');
    vi.mocked(fetchData).mockResolvedValue(mockEpisodesResponse);

    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(fetchData).toHaveBeenCalledWith(
        'https://rickandmortyapi.com/api/episode/?page=1&name=Pilot'
      );
    });

    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('Pilot');
    expect(await screen.findByText('Pilot')).toBeInTheDocument();
  });

  it('should allow user to type and search for episodes', async () => {
    const user = userEvent.setup();

    const mockSearchResults = {
      results: [
        {
          id: 2,
          name: 'Lawnmower Dog',
          air_date: 'December 9, 2013',
          episode: 'S01E02',
          characters: [],
          url: 'https://rickandmortyapi.com/api/episode/2',
          created: '2017-11-10T12:56:33.798Z',
        },
      ],
      info: { pages: 1 },
    };

    vi.mocked(fetchData)
      .mockResolvedValueOnce(mockInitialData)
      .mockResolvedValue(mockSearchResults);

    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    const input = screen.getByRole('textbox');
    await user.type(input, 'Lawnmower');

    expect(await screen.findByText('Lawnmower Dog')).toBeInTheDocument();
    expect(fetchData).toHaveBeenCalledWith(
      'https://rickandmortyapi.com/api/episode/?page=1&name=Lawnmower'
    );
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'searchTerm',
      'Lawnmower'
    );
  });

  it('should display an error message on failed API call', async () => {
    vi.mocked(fetchData).mockRejectedValue(new Error('Network error'));

    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    expect(await screen.findByText('Network error')).toBeInTheDocument();
    expect(screen.queryByText('Pilot')).not.toBeInTheDocument();
  });

  it('should toggle theme when clicking theme toggle button', async () => {
    const user = userEvent.setup();
    const { container } = render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    const appRoot = container.querySelector('.app');
    expect(appRoot).not.toHaveClass('dark-theme');

    const toggleButton = screen.getByRole('button', { name: /toggle theme/i });
    await user.click(toggleButton);

    expect(appRoot).toHaveClass('dark-theme');
  });
});
