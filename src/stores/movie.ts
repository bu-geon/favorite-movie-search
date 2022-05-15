import { IMovieItem } from 'types/movie.d';

import { atom } from 'hooks/state';

export const searchResultStore = atom<IMovieItem[]>({
  key: '#searchResultState',
  default: [],
});

export const queryStore = atom({
  key: '#query',
  default: '',
});

export const pageNumberStore = atom({
  key: '#pageNumber',
  default: 1,
});
