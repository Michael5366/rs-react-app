import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Spinner from '../../Spinner/Spinner';
import ErrorMsg from '../../Templates/ErrorMsg/ErrorMsg';
import fetchData from '../../../api/swapiService';
import type { RickAndMortyAPIEpisode } from '../../../types/interfaces';

const RightPanel = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get('details');

  const [item, setItem] = useState<RickAndMortyAPIEpisode | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;

    const fetchEpisode = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await fetchData(
          `https://rickandmortyapi.com/api/episode/${id}`
        );
        setItem(data as RickAndMortyAPIEpisode);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error in RightPanel');
        setItem(null);
      } finally {
        setLoading(false);
      }
    };

    fetchEpisode();
  }, [id]);

  const handleClose = () => {
    searchParams.delete('details');
    setSearchParams(searchParams);
    setItem(null);
  };

  if (loading) return <Spinner />;
  if (error) return <ErrorMsg errorMsg={error} />;
  if (!item) return null;

  return (
    <div className="app__items">
      <button onClick={handleClose} className="close-button">
        Close
      </button>
      <h3 className="app__items-header">Episode Description</h3>
      <div className="app__item-name">{item.name}</div>
      <div className="app__item-description">
        {item.episode} — {item.air_date}
      </div>
    </div>
  );
};

export default RightPanel;
