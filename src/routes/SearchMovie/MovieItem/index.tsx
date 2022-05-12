import { IMovieItem } from 'types/movie';
import DefaultImg from 'assets/imgs/default-img.jpg';
import styles from './movieItem.module.scss';
import { SyntheticEvent } from 'react';

const MovieItem = ({ Title: title, Year: year, Type: type, Poster: poster }: IMovieItem) => {
  const handleMovieClick = () => {
    // console.log(title, 'clicked!!');
  };

  const handleImgError = (e: SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = DefaultImg;
  };

  return (
    <>
      <button className={styles.movieCard} type='button' onClick={handleMovieClick}>
        <img className={styles.poster} src={poster} onError={handleImgError} alt='movie poster' />
        <div>
          <h3 className={styles.title}>{title}</h3>
          <div className={styles.year}>{year}</div>
          <div className={styles.type}>{type}</div>
        </div>
      </button>
      <button type='button' style={{ color: 'wheat' }}>
        추가
      </button>
      <button type='button' style={{ color: 'wheat' }}>
        취소
      </button>
    </>
  );
};

export default MovieItem;
