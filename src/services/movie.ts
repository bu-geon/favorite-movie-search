// import { axios } from 'hooks/worker';
import { IWeatherAPIRes } from 'types/weather.d';

import axios from 'axios';

const WEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5';

interface Params {
  lat: number;
  lon: number;
}

// 37.494958, 126.844128
// export const getWeatherForecast5DaysApi = (params: Params) =>
//   axios.get<IWeatherAPIRes>(`${WEATHER_BASE_URL}/forecast`, {
//     params: {
//       ...params,
//       appid: process.env.REACT_APP_WEATHER_APP_ID,
//       units: 'metric',
//     },
//   });

const SEARCH_MOVIE_BASE_URL = 'http://www.omdbapi.com';
const API_KEY = process.env.REACT_APP_SEARCH_MOVIE_API_KEY;

export const getSearchMovieApi = (s: string, page: number) =>
  axios.get(SEARCH_MOVIE_BASE_URL, {
    params: {
      apikey: API_KEY,
      s,
      page,
    },
  });
