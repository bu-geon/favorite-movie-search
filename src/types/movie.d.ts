export interface IMovieItem {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

export interface IMovieApiRes {
  response: boolean;
  search: IMovieItem[];
  totalResults: number;
  error: string | undefined;
}
