import { IMovieApiRes } from 'types/movie.d';
import axios from 'axios';

const SEARCH_MOVIE_BASE_URL = 'http://www.omdbapi.com';
const API_KEY = process.env.REACT_APP_SEARCH_MOVIE_API_KEY;

export const getSearchMovieApi = async (s: string, page: string) => {
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
      return { response, search: res.data.Search, error: res.data.Error, totalResults: res.data.totalResults };
    });

  return { ...data };
};

export function* tGenerator() {
  let value = 0;
  while (true) {
    yield (value += 1);
  }
}
