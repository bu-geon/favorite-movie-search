import { IMovieItem } from 'types/movie.d';

import { atom } from 'hooks/state';

export const searchResultStore = atom<IMovieItem[]>({
  key: '#searchResultState',
  default: [],
});

export const favoriteListStore = atom<IMovieItem[]>({
  key: '#favoriteListState',
  default: [],
});
