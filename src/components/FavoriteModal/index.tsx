import { MouseEvent, MouseEventHandler, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { IMovieItem } from 'types/movie';
import useLocalStorageState from 'use-local-storage-state';

import styles from './favoriteModal.module.scss';

const FAVORITE_BUTTON_ENUM = {
  ADD: '추가',
  REMOVE: '제거',
};

interface Props {
  action: 'ADD' | 'REMOVE';
  selectedMovie: IMovieItem;
  setIsOnModal: (param: boolean) => void;
}

const FavoriteButton = ({ action, selectedMovie, setIsOnModal }: Props) => {
  const [favoriteList, setFavoriteList] = useLocalStorageState<IMovieItem[]>('favoriteList', {
    ssr: true,
    defaultValue: [],
  });
  const modalRef = useRef<HTMLDivElement>(null);

  const handleOkayClick = () => {
    if (action === 'ADD') {
      setFavoriteList((prev) => [selectedMovie, ...prev]);
    }
    if (action === 'REMOVE') {
      const newFavoriteList = favoriteList.filter((movie) => movie.imdbID !== selectedMovie.imdbID);
      setFavoriteList(() => [...newFavoriteList]);
    }
    setIsOnModal(false);
  };

  const handleCancelClick = () => {
    setIsOnModal(false);
  };

  const handleOutSideModalClick = () => {
    setIsOnModal(false);
  };

  return (
    <div className={styles.backdrop} ref={modalRef} onClick={handleOutSideModalClick} role='button' tabIndex={0}>
      <div className={styles.modalButton}>
        <h3 className={styles.title}>즐겨찾기 {FAVORITE_BUTTON_ENUM[action]}</h3>
        <button type='button' onClick={handleOkayClick}>
          확인
        </button>
        <button type='button' onClick={handleCancelClick}>
          취소
        </button>
      </div>
    </div>
  );
};

const FavoriteModal = (props: Props) => {
  return createPortal(<FavoriteButton {...props} />, document.getElementById('root')!);
};

export default FavoriteModal;
