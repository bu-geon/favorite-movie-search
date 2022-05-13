import { ChangeEvent, FormEvent, useCallback, useRef, useState, MouseEvent } from 'react';

import MovieItem from './MovieItem';
import { useMovieSearch } from 'hooks/movie';
import styles from './searchMovie.module.scss';
import PageTitle from 'components/PageTitle';
import FavoriteModal from 'components/FavoriteModal';
import { IMovieItem } from 'types/movie';
import useLocalStorageState from 'use-local-storage-state';
import Loading from 'components/Loading';

const SearchMovie = () => {
  const [query, setQuery] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState<IMovieItem | null>(null);
  const { movies, hasMore, loading, errorMessage } = useMovieSearch(query, pageNumber);
  const [isOnModal, setIsOnModal] = useState(false);
  const [favoriteList] = useLocalStorageState<IMovieItem[]>('favoriteList', {
    ssr: true,
    defaultValue: [],
  });

  const observer = useRef<IntersectionObserver>();
  const lastMovieRef = useCallback(
    (node: HTMLLIElement) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prev) => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const handleQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.currentTarget.value);
    setPageNumber(1);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setQuery('');
  };

  const handleOpenFavoriteModal = (e: MouseEvent<HTMLLIElement>) => {
    setIsOnModal(true);
    setSelectedMovie(movies[e.currentTarget.value]);
  };

  return (
    <>
      <PageTitle title='검색' />
      <form onSubmit={handleSubmit}>
        <input
          className={styles.searchQuery}
          value={query}
          onChange={handleQueryChange}
          placeholder='영화 제목을 입력해주세요.'
        />
      </form>
      <ul>
        {movies.map((movie, index) => (
          <li
            key={movie.imdbID}
            value={index}
            onClick={handleOpenFavoriteModal}
            ref={index === movies.length - 1 ? lastMovieRef : null}
            role='menuitem'
          >
            <MovieItem {...movie} />
          </li>
        ))}
      </ul>
      {!loading && movies.length === 0 && <div className={styles.noResult}>검색 결과가 없습니다.</div>}
      {loading && <Loading />}
      {errorMessage && <div>{errorMessage}</div>}
      {isOnModal && (
        <FavoriteModal
          action={favoriteList.find((movie) => movie.imdbID === selectedMovie?.imdbID) ? 'REMOVE' : 'ADD'}
          selectedMovie={selectedMovie!}
          setIsOnModal={setIsOnModal}
        />
      )}
    </>
  );
};

export default SearchMovie;
