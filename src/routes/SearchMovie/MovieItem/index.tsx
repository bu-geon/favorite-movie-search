import { IMovieItem } from 'types/movie';
import DefaultImg from 'assets/imgs/default-img.jpg';
import styles from './movieItem.module.scss';
import { SyntheticEvent } from 'react';

import { Bookmark } from 'assets/svgs';

const MovieItem = ({ Title: title, Year: year, Type: type, Poster: poster }: IMovieItem) => {
  const handleImgError = (e: SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = DefaultImg;
  };

  return (
    <>
      <img className={styles.poster} src={poster} onError={handleImgError} alt='movie poster' />
      <div className={styles.info}>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.description}>
          <span className={styles.year}>{year}</span>
          <span className={styles.type}>{type}</span>
        </div>
      </div>
      <Bookmark className={styles.bookmark} />
    </>
  );
};

export default MovieItem;
