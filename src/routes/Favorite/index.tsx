import { useRecoilState } from 'recoil';

import PageTitle from 'components/PageTitle';
import MovieItem from 'routes/SearchMovie/MovieItem';
import { favoriteListStore } from 'stores/movie';

const Favorite = () => {
  const [favoriteList, setFavoriteList] = useRecoilState(favoriteListStore);
  return (
    <>
      <PageTitle title='내 즐겨찾기' />
      <ul>
        {favoriteList.map((el) => (
          <MovieItem {...el} key={el.imdbID} />
        ))}
      </ul>
    </>
  );
};

export default Favorite;
