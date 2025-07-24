import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import fetchData from '../api/swapiService';

vi.mock('../api/swapiService', () => ({
  default: vi.fn(),
}));

describe('App component', (): void => {
  beforeEach((): void => {
    vi.clearAllMocks();

    localStorage.clear();

    vi.spyOn(Storage.prototype, 'setItem');
  });

  it('should render and fetch initial data when no search term in localStorage', async () => {
    const mockFilms = {
      results: [
        {
          title: 'A New Hope',
          opening_crawl: 'It is a period of civil war...',
        },
      ],
    };

    vi.mocked(fetchData).mockResolvedValue(mockFilms);

    render(<App />);

    const spinner: HTMLElement = screen.getByRole('status');
    expect(spinner).toBeInTheDocument();

    expect(fetchData).toHaveBeenCalledTimes(1);
    expect(fetchData).toHaveBeenCalledWith('https://swapi.py4e.com/api/films/');

    const filmTitle = await screen.findByText('A New Hope');
    expect(filmTitle).toBeInTheDocument();

    expect(spinner).not.toBeInTheDocument();
  });

  it('should load search term from localStorage and fetch data on mount', async () => {
    localStorage.setItem('searchTerm', 'New Hope');

    const mockSearchResults = {
      results: [
        {
          title: 'A New Hope',
          opening_crawl: 'It is a period of civil war...',
        },
      ],
    };

    vi.mocked(fetchData).mockResolvedValue(mockSearchResults);

    render(<App />);

    const spinner: HTMLElement = screen.getByRole('status');

    expect(fetchData).toHaveBeenCalledTimes(1);
    expect(fetchData).toHaveBeenCalledWith(
      'https://swapi.py4e.com/api/films/?search=New%20Hope'
    );

    const input: HTMLElement = screen.getByRole('textbox');
    expect(input).toHaveValue('New Hope');

    const filmTitle: HTMLElement = await screen.findByText('A New Hope');
    expect(filmTitle).toBeInTheDocument();

    expect(spinner).not.toBeInTheDocument();
  });

  it('should allow user to type, search, and see results', async () => {
    const user = userEvent.setup();

    vi.mocked(fetchData).mockResolvedValueOnce({ results: [] });

    const mockSearchResponse = {
      results: [
        {
          title: 'A New Hope',
          opening_crawl: 'It is a period of civil war.',
        },
      ],
    };

    vi.mocked(fetchData).mockResolvedValueOnce(mockSearchResponse);

    vi.spyOn(Storage.prototype, 'setItem');

    render(<App />);

    await screen.findByRole('textbox');

    const button: HTMLElement = screen.getByRole('button', {
      name: "Let's go",
    });
    const input: HTMLElement = screen.getByRole('textbox');
    expect(button).toBeInTheDocument();
    expect(input).toBeInTheDocument();

    await user.type(input, 'New Hope');
    expect(input).toHaveValue('New Hope');

    await user.click(button);

    expect(fetchData).toHaveBeenCalledWith(
      'https://swapi.py4e.com/api/films/?search=New%20Hope'
    );

    expect(localStorage.setItem).toHaveBeenCalledWith('searchTerm', 'New Hope');

    const spinner: HTMLElement | null = screen.queryByRole('status');
    if (spinner) {
      expect(spinner).toBeInTheDocument();
    }

    const filmTitle: HTMLElement = await screen.findByText('A New Hope');
    expect(filmTitle).toBeInTheDocument();

    expect(spinner).not.toBeInTheDocument();
  });

  it('should display an error message if the API call fails', async () => {
    const user = userEvent.setup();

    vi.mocked(fetchData).mockResolvedValueOnce({ results: [] });

    const errorMessage = 'Something went wrong';
    vi.mocked(fetchData).mockRejectedValueOnce(new Error(errorMessage));

    render(<App />);

    const button: HTMLElement = screen.getByRole('button', {
      name: "Let's go",
    });
    const input: HTMLElement = screen.getByRole('textbox');
    expect(button).toBeInTheDocument();
    expect(input).toBeInTheDocument();

    await user.type(input, 'Some error');
    expect(input).toHaveValue('Some error');

    await user.click(button);

    const spinner: HTMLElement | null = screen.queryByRole('status');
    if (spinner) {
      expect(spinner).toBeInTheDocument();
    }

    const errorElement: HTMLElement = await screen.findByText(errorMessage);
    expect(errorElement).toBeInTheDocument();

    const itemHeader = screen.queryByRole('Item header');
    expect(itemHeader).not.toBeInTheDocument();

    expect(spinner).not.toBeInTheDocument();
  });

  it('should toggle theme when theme toggle button is clicked', async () => {
    const user = userEvent.setup();

    const { container } = render(<App />);

    const appRootElement = container.querySelector('.app');
    if (appRootElement) {
      expect(appRootElement).not.toHaveClass('dark-theme');
    }

    const toggleThemeBtn = screen.getByRole('button', {
      name: 'toggle theme',
    });

    await user.click(toggleThemeBtn);

    if (appRootElement) {
      expect(appRootElement).toHaveClass('dark-theme');
    }
  });
});
