export interface IMovieItem {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
  isFavorite?: boolean;
}

export interface IMovieApiRes {
  response: boolean;
  search: IMovieItem[];
  totalResults: number;
  error: string;
}

export interface IMovieSearch {
  movies: IMovieItem[];
  hasMore: boolean;
  loading: boolean;
  error: boolean;
}
