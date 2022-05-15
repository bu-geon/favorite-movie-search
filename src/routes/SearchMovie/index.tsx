import { ChangeEvent, FormEvent, useCallback, useRef, useState, MouseEvent } from 'react';
import { useUnmount, useUpdateEffect } from 'react-use';
import { useRecoilState } from 'recoil';
import useLocalStorageState from 'use-local-storage-state';

import MovieItem from './MovieItem';
import { useMovieSearch } from 'hooks/movie';
import styles from './searchMovie.module.scss';
import PageTitle from 'components/PageTitle';
import FavoriteModal from 'components/FavoriteModal';
import { IMovieItem } from 'types/movie';
import Loading from 'components/Loading';
import { pageNumberStore, queryStore, searchResultStore } from 'stores/movie';

let timer: NodeJS.Timeout;

const SearchMovie = () => {
  const [userInput, setUserInput] = useState('');
  const [, setQuery] = useRecoilState(queryStore);
  const [, setPageNumber] = useRecoilState(pageNumberStore);
  const [movies, setMovies] = useRecoilState(searchResultStore);
  const [selectedMovie, setSelectedMovie] = useState<IMovieItem | null>(null);
  const [isOnModal, setIsOnModal] = useState(false);
  const { hasMore, loading } = useMovieSearch();
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
    [loading, hasMore, setPageNumber]
  );

  const handleQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.currentTarget.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setQuery('');
  };

  const handleOpenFavoriteModal = (e: MouseEvent<HTMLLIElement>) => {
    setIsOnModal(true);
    setSelectedMovie(movies[e.currentTarget.value]);
  };

  useUpdateEffect(() => {
    if (userInput.trim().length === 0) return;
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      setMovies([]);
      setPageNumber(1);
      setQuery(userInput);
    }, 300);
  }, [userInput, setQuery]);

  useUnmount(() => {
    clearTimeout(timer);
  });

  return (
    <>
      <PageTitle title='검색' />
      <form onSubmit={handleSubmit}>
        <input
          className={styles.searchQuery}
          value={userInput}
          onChange={handleQueryChange}
          placeholder='영화 제목 입력(only English)'
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
