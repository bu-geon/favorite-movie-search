import { ChangeEvent, FormEvent, useCallback, useRef, useState } from 'react';

import MovieItem from './MovieItem';
import { useMovieSearch } from 'hooks/movie';
import styles from './searchMovie.module.scss';
import PageTitle from 'components/PageTitle';

const SearchMovie = () => {
  const [query, setQuery] = useState('');
  const [pageNumber, setPageNumber] = useState(1);

  const handleQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.currentTarget.value);
    setPageNumber(1);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setQuery('');
  };

  const { movies, hasMore, loading, errorMessage } = useMovieSearch(query, pageNumber);

  const observer = useRef<IntersectionObserver>();
  const lastMovieRef = useCallback(
    (node: HTMLLIElement) => {
      // if (loading) return;
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
      {movies.length === 0 && <div>검색 결과가 없습니다. </div>}
      <ul>
        {movies.map((movie, index) => (
          <li
            className={styles.movieItem}
            key={movie.imdbID}
            role='menuitem'
            ref={index === movies.length - 1 ? lastMovieRef : null}
          >
            <MovieItem {...movie} />
          </li>
        ))}
      </ul>
      {loading && <div>검색중</div>}
      {errorMessage && <div>{errorMessage}</div>}
    </>
  );
};

export default SearchMovie;
