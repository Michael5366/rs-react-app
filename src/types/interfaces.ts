export interface HtmlElementProps {
  className?: string;
  children?: React.ReactNode;
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

export interface EpisodeCardData {
  id: number;
  itemHeader: string;
  title: string;
  desHeader: string;
  description: string;
}

export interface DataProps {
  data: EpisodeCardData[] | null;
  loading: boolean;
  error: string;
}

export interface AppContextProps {
  searchTerm?: string;
  setSearchTerm?: (value: string) => void;
  handleSearch?: (term?: string, currentPage?: number) => void;
  data?: EpisodeCardData[] | null;
  loading?: boolean;
  error?: string;
  totalPages?: number;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export interface LeftPanelProps {
  item: EpisodeCardData;
}
