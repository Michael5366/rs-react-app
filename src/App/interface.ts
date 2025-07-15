import type { FilmData } from '../types/interfaces';

export interface Film {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  characters: string[];
  planets: string[];
  starships: string[];
  vehicles: string[];
  species: string[];
  created: string;
  edited: string;
  url: string;
}

export interface SwapiFilmResponse {
  count?: number;
  results?: Film[];
  detail?: string;
}

export interface AppState {
  data: FilmData[] | null;
  detail: string;
  loading: boolean;
  error: string;
  darkMode: boolean;
  searchTerm: string;
}
