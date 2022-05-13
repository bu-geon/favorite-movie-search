import { MouseEvent, useState } from 'react';
import useLocalStorageState from 'use-local-storage-state';

import PageTitle from 'components/PageTitle';
import MovieItem from 'routes/SearchMovie/MovieItem';
import { IMovieItem } from 'types/movie';
import FavoriteModal from 'components/FavoriteModal';

const Favorite = () => {
  const [isOnModal, setIsOnModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<IMovieItem | null>(null);
  const [favoriteList] = useLocalStorageState<IMovieItem[]>('favoriteList', {
    ssr: true,
    defaultValue: [],
  });

  const handleFavoriteRemove = (e: MouseEvent<HTMLLIElement>) => {
    setSelectedMovie(favoriteList[e.currentTarget.value]);
    setIsOnModal(true);
  };

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
      {isOnModal && <FavoriteModal action='REMOVE' selectedMovie={selectedMovie!} setIsOnModal={setIsOnModal} />}
    </>
  );
};

export default Favorite;
