import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import fetchData from '../api/swapiService';
import { MemoryRouter } from 'react-router-dom';

vi.mock('../api/swapiService', () => ({
  default: vi.fn(),
}));

describe('App component', (): void => {
  beforeEach((): void => {
    vi.clearAllMocks();
    localStorage.clear();
    vi.spyOn(Storage.prototype, 'setItem');
  });

  it('should fetch default episodes when no search term in localStorage', async () => {
    const mockEpisodes = {
      results: [
        {
          id: 1,
          name: 'Pilot',
          air_date: 'December 2, 2013',
          episode: 'S01E01',
          characters: [],
          url: 'https://rickandmortyapi.com/api/episode/1',
          created: '2017-11-10T12:56:33.798Z',
        },
      ],
    };

    vi.mocked(fetchData).mockResolvedValue(mockEpisodes);

    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    expect(fetchData).toHaveBeenCalledWith(
      'https://rickandmortyapi.com/api/episode'
    );

    const title = await screen.findByText('Pilot');
    const description = screen.getByText('December 2, 2013 — S01E01');

    expect(title).toBeInTheDocument();
    expect(description).toBeInTheDocument();
  });

  it('should load saved search term from localStorage and fetch filtered episodes', async () => {
    localStorage.setItem('searchTerm', 'Pilot');

    const mockEpisodes = {
      results: [
        {
          id: 1,
          name: 'Pilot',
          air_date: 'December 2, 2013',
          episode: 'S01E01',
          characters: [],
          url: 'https://rickandmortyapi.com/api/episode/1',
          created: '2017-11-10T12:56:33.798Z',
        },
      ],
    };

    vi.mocked(fetchData).mockResolvedValue(mockEpisodes);

    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    expect(fetchData).toHaveBeenCalledWith(
      'https://rickandmortyapi.com/api/episode/?name=Pilot'
    );

    const input = screen.getByRole('textbox');
    expect(input).toHaveValue('Pilot');

    const title = await screen.findByText('Pilot');
    expect(title).toBeInTheDocument();
  });

  it('should allow user to type and search for episodes', async () => {
    const user = userEvent.setup();

    vi.mocked(fetchData).mockResolvedValueOnce({
      results: [],
      info: {
        count: 0,
        pages: 0,
        next: null,
        prev: null,
      },
    });

    const mockSearchResults = {
      results: [
        {
          id: 2,
          name: 'Lawnmower Dog',
          air_date: 'December 9, 2013',
          episode: 'S01E02',
          characters: [],
          url: 'https://rickandmortyapi.com/api/episode/1',
          created: '2017-11-10T12:56:33.798Z',
        },
      ],
    };

    vi.mocked(fetchData).mockResolvedValueOnce(mockSearchResults);

    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    await screen.findByRole('textbox');

    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: /let's go/i });

    await user.clear(input);
    await user.type(input, 'Lawnmower');
    await user.click(button);

    expect(fetchData).toHaveBeenCalledWith(
      'https://rickandmortyapi.com/api/episode/?name=Lawnmower'
    );

    const result = await screen.findByText('Lawnmower Dog');
    expect(result).toBeInTheDocument();
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'searchTerm',
      'Lawnmower'
    );
  });

  it('should display an error message on failed API call', async () => {
    const user = userEvent.setup();

    vi.mocked(fetchData).mockResolvedValueOnce({
      results: [],
      info: {
        count: 0,
        pages: 0,
        next: null,
        prev: null,
      },
    });

    vi.mocked(fetchData).mockRejectedValueOnce(new Error('Network error'));

    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: /let's go/i });

    await user.type(input, 'error');
    await user.click(button);

    const error = await screen.findByText('Network error');
    expect(error).toBeInTheDocument();

    const card = screen.queryByRole('heading', { name: /episode/i });
    expect(card).not.toBeInTheDocument();
  });

  it('should toggle theme when clicking theme toggle button', async () => {
    const user = userEvent.setup();

    const { container } = render(
      <MemoryRouter>
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
