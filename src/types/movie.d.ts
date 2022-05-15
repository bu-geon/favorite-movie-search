export interface IMovieItem {
  title: string;
  year: string;
  imdbID: string;
  type: string;
  poster: string;
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
