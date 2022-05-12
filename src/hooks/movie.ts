import { useRecoilState } from 'recoil';
import { useEffect, useState } from 'react';
import { searchResultStore } from 'stores/movie';
import { getSearchMovieApi } from 'services/movie';

export const useMovieSearch = (query: string, pageNumber: number) => {
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
  const [movies, setMovies] = useRecoilState(searchResultStore);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setMovies([]);
  }, [query, setMovies]);

  useEffect(() => {
    const fetchData = async () => {
      const { response, search, totalResults, error } = await getSearchMovieApi(query, pageNumber);
      console.log(search, totalResults, pageNumber);
      setLoading(false);
      if (!response) {
        setErrorMessage(error);
        return;
      }
      setErrorMessage(undefined);
      setMovies((prev) => [...prev, ...search]);
      setHasMore(pageNumber * 10 < totalResults);
    };

    setLoading(true);
    setErrorMessage(undefined);
    fetchData();
  }, [query, pageNumber, setMovies]);

  return { loading, hasMore, errorMessage, movies };
};
