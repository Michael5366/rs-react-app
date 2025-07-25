import { useCallback, useEffect, useState } from 'react';
import type { FilmData } from '../types/interfaces';
import Main from '../components/Main/Main';
import SearchForm from '../components/Search/Form';
import CardList from '../components/CardList/CardList';
import ErrorButton from '../components/ErrorButton/ErrorButton';
import fetchData from '../api/swapiService';
import type { Film, SwapiFilmResponse } from './interface';
import ThemeToggle from '../components/ThemeToggle/ThemeToggle';

const App = () => {
  const [data, setData] = useState<FilmData[] | null>(null);
  const [detail, setDetail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleError = (message: string): void => {
    setDetail('Something went wrong');
    setData(null);
    setLoading(false);
    setError(message);
  };

  const handleSearch = useCallback(async (term?: string) => {
    if (term) {
      localStorage.setItem('searchTerm', term);
    }

    setLoading(true);
    setSearchTerm(term ?? '');

    const url: string = term
      ? `https://swapi.py4e.com/api/films/?search=${encodeURIComponent(term)}`
      : 'https://swapi.py4e.com/api/films/';

    try {
      const data: SwapiFilmResponse = await fetchData(url);

      if (data && detail) {
        setDetail(detail);
        setData(null);
        setLoading(false);
        return;
      }

      setDetail('');

      setData(
        data.results?.map((film: Film) => ({
          itemHeader: 'Item name',
          title: film.title,
          desHeader: 'Item description',
          opening_crawl: film.opening_crawl,
        })) ?? null
      );

      setLoading(false);
    } catch (error) {
      console.error(`Error from handleSearch: ${error}`);
      if (error instanceof Error) {
        handleError(error.message);
      } else {
        handleError('Unknown error occurred');
      }
    }
  }, []);

  useEffect((): void => {
    const savedTerm: string | null = localStorage.getItem('searchTerm');
    if (savedTerm) {
      setSearchTerm(savedTerm);
      handleSearch(savedTerm);
    } else {
      handleSearch();
    }
  }, [handleSearch]);

  const themeToggle = (): void => {
    setDarkMode((prev) => !prev);
  };

  return (
    <div className={`app ${darkMode ? 'dark-theme' : ''}`}>
      <ThemeToggle onToggle={themeToggle} isDark={darkMode} />

      <Main>
        <SearchForm
          value={searchTerm}
          onSearch={handleSearch}
          onChange={(value) => setSearchTerm(value)}
        />
        <CardList data={data} loading={loading} error={error} />
        <ErrorButton />
      </Main>
    </div>
  );
};

export default App;
