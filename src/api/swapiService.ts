import type { RickAndMortyAPIEpisodeResponse } from '../types/interfaces';

const fetchData = async (
  url: string
): Promise<RickAndMortyAPIEpisodeResponse> => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error response: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default fetchData;
