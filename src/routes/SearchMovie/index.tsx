import { ChangeEvent, FormEvent, useState } from 'react';
import { useRecoilState } from 'recoil';

import { getSearchMovieApi } from 'services/movie';
import { searchResultStore } from 'stores/movie';
import { IMovieApiRes, IMovieItem } from 'types/movie';
import MovieItem from './MovieItem';
import styles from './searchMovie.module.scss';

const SearchMovie = () => {
  const [results, setResults] = useRecoilState<IMovieItem[]>(searchResultStore);
  const [searchKeyword, setSearchKeyword] = useState('');

  const handleChangeKeyword = async (e: ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.currentTarget.value);
    const { response, search }: IMovieApiRes = await getSearchMovieApi(e.currentTarget.value, '1');

    // console.log(response, search, error, totalResults);
    if (!response) {
      setResults([]);
      return;
    }
    setResults(search);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchKeyword('');
  };

  return (
    <>
      <h1>검색</h1>
      <form onSubmit={handleSubmit}>
        <input
          className={styles.searchMovie}
          value={searchKeyword}
          onChange={handleChangeKeyword}
          placeholder='영화 제목을 입력해주세요.'
        />
      </form>
      {results.length === 0 && <div>검색 결과가 없습니다. </div>}
      <ul>
        {results.map((item) => (
          <li key={item.imdbID}>
            <MovieItem {...item} />
          </li>
        ))}
      </ul>
    </>
  );
};

export default SearchMovie;
