export interface HtmlElementProps {
  className?: string;
  children?: React.ReactNode;
}

export interface CharacterData {
  id?: number;
  itemHeader?: string;
  title?: string;
  desHeader?: string;
  description?: string;
  image?: string;
}

export interface RickAndMortyAPICharacter {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
  [key: string]: unknown;
}

export interface RickAndMortyAPIResponse {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: RickAndMortyAPICharacter[];
}

export interface RickAndMortyAPIEpisode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
}

export interface RickAndMortyAPIEpisodeResponse {
  info?: {
    count?: number;
    pages?: number;
    next?: string | null;
    prev?: string | null;
  };
  results?: RickAndMortyAPIEpisode[];
}

export interface DataProps {
  data: CharacterData[] | null;
  loading: boolean;
  error: string;
}
