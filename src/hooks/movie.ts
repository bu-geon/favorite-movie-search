import { useRecoilState } from 'recoil';
import { useState } from 'react';
import { useUpdateEffect } from 'react-use';

import { pageNumberStore, queryStore, searchResultStore } from 'stores/movie';
import { getSearchMovieApi } from 'services/movie';
import { IMovieApiRes } from 'types/movie.d';

export const useMovieSearch = () => {
  const [query] = useRecoilState(queryStore);
  const [pageNumber] = useRecoilState(pageNumberStore);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
  const [hasMore, setHasMore] = useState(false);
  const [, setMovies] = useRecoilState(searchResultStore);

  useUpdateEffect(() => {
    const fetchData = async () => {
      const { response, search, totalResults, error }: IMovieApiRes = await getSearchMovieApi(query, pageNumber);

      setLoading(false);

      if (!response) {
        setErrorMessage(error);

        return;
      }
      setErrorMessage(undefined);
      setMovies((prev) =>
        search.reduce(
          (acc, cur) => {
            if (!acc.find((movie) => movie.imdbID === cur.imdbID)) acc.push(cur);
            return acc;
          },
          [...prev]
        )
      );
      setHasMore(pageNumber * 10 < totalResults);
    };

    if (query.trim().length > 0) {
      setLoading(true);
      setErrorMessage(undefined);
      fetchData();
    }
  }, [query, pageNumber]);

  return { loading, hasMore, errorMessage };
};
