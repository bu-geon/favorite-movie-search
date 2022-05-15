import { IMovieApiRes, IMovieItem } from 'types/movie.d';
import axios from 'axios';

const SEARCH_MOVIE_BASE_URL = 'https://www.omdbapi.com';
const API_KEY = process.env.REACT_APP_SEARCH_MOVIE_API_KEY;

interface IMovieData {
  Poster: string;
  Title: string;
  Type: string;
  Year: string;
  imdbID: string;
}

export const getSearchMovieApi = async (s: string, page: number) => {
  const data: IMovieApiRes = await axios
    .get(SEARCH_MOVIE_BASE_URL, {
      params: {
        apikey: API_KEY,
        s,
        page,
      },
    })
    .then((res) => {
      const response = res.data.Response === 'True';
      const search = res.data.Search?.reduce((acc: IMovieItem[], cur: IMovieData) => {
        if (acc.findIndex((el) => el.imdbID === cur.imdbID) === -1)
          acc.push({ title: cur.Title, type: cur.Type, year: cur.Year, imdbID: cur.imdbID, poster: cur.Poster });

        return acc;
      }, []);
      const error = res.data.Error ?? '';
      const totalResults = res.data.totalResults ?? 0;
      return { response, search, error, totalResults };
    });

  return { ...data };
};
