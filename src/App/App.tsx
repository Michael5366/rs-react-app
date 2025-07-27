import { useCallback, useEffect, useState } from 'react';
import fetchData from '../api/swapiService';
import ThemeToggle from '../components/ThemeToggle/ThemeToggle';
import useLocalStorage from '../Hooks/useLocalStorage';
import { AppContext } from '../context/AppContext';
import type {
  EpisodeCardData,
  RickAndMortyAPIEpisode,
  RickAndMortyAPIEpisodeResponse,
} from '../types/interfaces';
import { Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePgae/HomePgae';
import AboutPage from '../pages/AboutPage/AboutPage';
import Page404 from '../pages/Page404/Page404';

const App = () => {
  const [data, setData] = useState<EpisodeCardData[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useLocalStorage('searchTerm', '');

  const handleError = (message: string): void => {
    setData(null);
    setLoading(false);
    setError(message);
  };

  const handleSearch = useCallback(
    async (term?: string) => {
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
    },
    [setSearchTerm]
  );

  useEffect((): void => {
    handleSearch(searchTerm);
  }, []);

  const themeToggle = (): void => {
    setDarkMode((prev) => !prev);
  };

  return (
    <AppContext
      value={{ searchTerm, setSearchTerm, handleSearch, data, loading, error }}
    >
      <div className={`app ${darkMode ? 'dark-theme' : ''}`}>
        <ThemeToggle onToggle={themeToggle} isDark={darkMode} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </div>
    </AppContext>
  );
};

export default App;
