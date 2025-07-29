import { useCallback, useState } from 'react';
import fetchData from '../api/swapiService';
import ThemeToggle from '../components/ThemeToggle/ThemeToggle';
import useLocalStorage from '../Hooks/useLocalStorage';
import { AppContext } from '../context/AppContext';
import { Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePgae/HomePgae';
import AboutPage from '../pages/AboutPage/AboutPage';
import Page404 from '../pages/Page404/Page404';
import type {
  EpisodeCardData,
  RickAndMortyAPIEpisode,
  RickAndMortyAPIEpisodeResponse,
} from '../types/interfaces';
import RightPanel from '../components/CardList/RightPanel/RightPanel';

const App = () => {
  const [data, setData] = useState<EpisodeCardData[] | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useLocalStorage('searchTerm', '');

  const handleError = (message: string): void => {
    setData(null);
    setLoading(false);
    setError(message);
  };

  const handleSearch = useCallback(async (term?: string, page: number = 1) => {
    setLoading(true);
    setError('');

    const params = new URLSearchParams();
    params.append('page', String(page));
    if (term) {
      params.append('name', term);
    }

    const url = `https://rickandmortyapi.com/api/episode/?${params.toString()}`;

    try {
      const response: RickAndMortyAPIEpisodeResponse = await fetchData(url);
      setData(
        response.results?.map((episode: RickAndMortyAPIEpisode) => ({
          id: episode.id,
          itemHeader: 'Episode',
          title: episode.name,
          desHeader: 'Air Date & Code',
          description: `${episode.air_date} — ${episode.episode}`,
        })) ?? null
      );
      setTotalPages(response.info?.pages ?? 1);
      setLoading(false);
    } catch (error) {
      if (error instanceof Error) {
        handleError(error.message);
      } else {
        handleError('Unknown error occurred');
      }
    }
  }, []);

  const themeToggle = (): void => {
    setDarkMode((prev) => !prev);
  };

  return (
    <AppContext.Provider
      value={{
        searchTerm,
        setSearchTerm,
        handleSearch,
        data,
        loading,
        error,
        totalPages,
      }}
    >
      <div className={`app ${darkMode ? 'dark-theme' : ''}`}>
        <ThemeToggle onToggle={themeToggle} isDark={darkMode} />
        <Routes>
          <Route path="/" element={<HomePage />}>
            <Route path="details/:id" element={<RightPanel />} />
          </Route>
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </div>
    </AppContext.Provider>
  );
};

export default App;
