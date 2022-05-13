import useLocalStorageState from 'use-local-storage-state';

import PageTitle from 'components/PageTitle';
import MovieItem from 'routes/SearchMovie/MovieItem';
import { IMovieItem } from 'types/movie';

const Favorite = () => {
  const [favoriteList] = useLocalStorageState<IMovieItem[]>('favoriteList', {
    ssr: true,
    defaultValue: [],
  });

  const handleFavoriteRemove = () => {};

  return (
    <>
      <PageTitle title='내 즐겨찾기' />
      <ul>
        {favoriteList.map((movie, index) => (
          <li value={index} key={movie.imdbID} onClick={handleFavoriteRemove} role='menuitem'>
            <MovieItem {...movie} />
          </li>
        ))}
      </ul>
    </>
  );
};

export default Favorite;
