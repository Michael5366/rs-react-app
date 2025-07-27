import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from '../../Spinner/Spinner';
import ErrorMsg from '../../Templates/ErrorMsg/ErrorMsg';
import fetchData from '../../../api/swapiService'; // путь измени, если другой
import type { RickAndMortyAPIEpisode } from '../../../types/interfaces';

const RightPanel = () => {
  const { id } = useParams();
  const [item, setItem] = useState<RickAndMortyAPIEpisode | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;

    const fetchEpisode = async () => {
      setLoading(true);
      try {
        const data = await fetchData(
          `https://rickandmortyapi.com/api/episode/${id}`
        );
        setItem(data as RickAndMortyAPIEpisode);
        setError('');
      } catch (error) {
        setError(
          error instanceof Error ? error.message : 'Error in RightPanel'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchEpisode();
  }, [id]);

  if (loading) return <Spinner />;
  if (error) return <ErrorMsg errorMsg={error} />;
  if (!item) return null;

  return (
    <div className="app__items">
      <h3 className="app__items-header">Episode Description</h3>
      <div className="app__item-name">{item.name}</div>
      <div className="app__item-description">
        {item.episode} — {item.air_date}
      </div>
    </div>
  );
};

export default RightPanel;
