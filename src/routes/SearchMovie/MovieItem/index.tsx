import { IMovieItem } from 'types/movie';
import DefaultImg from 'assets/imgs/default-img.jpg';
import styles from './movieItem.module.scss';
import { SyntheticEvent, useEffect, useState } from 'react';

import { Bookmark } from 'assets/svgs';
import useLocalStorageState from 'use-local-storage-state';

const MovieItem = ({ Title: title, Year: year, Type: type, Poster: poster, imdbID }: IMovieItem) => {
  const [favoriteList] = useLocalStorageState<IMovieItem[]>('favoriteList', { ssr: true, defaultValue: [] });
  const [isBookmark, setIsBookmark] = useState(false);

  const handleImgError = (e: SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = DefaultImg;
  };

  useEffect(() => {
    setIsBookmark(favoriteList.findIndex((movie) => movie.imdbID === imdbID) !== -1);
  }, [favoriteList, imdbID]);

  return (
    <div className={styles.movieItem}>
      <img className={styles.poster} src={poster} onError={handleImgError} alt='movie poster' />
      <div className={styles.info}>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.description}>
          <span className={styles.year}>{year}</span>
          <span className={styles.type}>{type}</span>
        </div>
      </div>
      {isBookmark && <Bookmark className={styles.bookmark} />}
    </div>
  );
};

export default MovieItem;
