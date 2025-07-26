import { useCallback, useEffect, useState } from 'react';
import Main from '../components/Main/Main';
import SearchForm from '../components/Search/Form';
import CardList from '../components/CardList/CardList';
import ErrorButton from '../components/ErrorButton/ErrorButton';
import fetchData from '../api/swapiService';
import ThemeToggle from '../components/ThemeToggle/ThemeToggle';
import type {
  CharacterData,
  RickAndMortyAPIEpisode,
  RickAndMortyAPIEpisodeResponse,
} from '../types/interfaces';

const App = () => {
  const [data, setData] = useState<CharacterData[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleError = (message: string): void => {
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
      ? `https://rickandmortyapi.com/api/episode/?name=${encodeURIComponent(term)}`
      : 'https://rickandmortyapi.com/api/episode';

    try {
      const data: RickAndMortyAPIEpisodeResponse = await fetchData(url);

      setData(
        data.results?.map((episode: RickAndMortyAPIEpisode) => ({
          id: episode.id,
          itemHeader: 'Episode',
          title: episode.name,
          desHeader: 'Air Date & Code',
          description: `${episode.air_date} — ${episode.episode}`,
        })) ?? null
      );

      setLoading(false);
      setError('');
    } catch (error) {
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
