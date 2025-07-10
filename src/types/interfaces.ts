export interface HtmlElementProps {
  className?: string;
  children?: React.ReactNode;
}

export interface FilmData {
  headerItem?: string;
  title?: string;
  headerDescription?: string;
  description?: string;
  detail?: string;
  opening_crawl?: string;
}

export interface DataProps {
  data: FilmData[] | null;
}
