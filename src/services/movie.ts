import { IMovieApiRes } from 'types/movie.d';
import axios from 'axios';

const SEARCH_MOVIE_BASE_URL = 'https://www.omdbapi.com';
const API_KEY = process.env.REACT_APP_SEARCH_MOVIE_API_KEY;

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
      const search = res.data.Search ?? [];
      const error = res.data.Error ?? '';
      const totalResults = res.data.totalResults ?? 0;
      return { response, search, error, totalResults };
    });

  return { ...data };
};
