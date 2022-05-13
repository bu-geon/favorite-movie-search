import { createPortal } from 'react-dom';
import { IMovieItem } from 'types/movie';
import useLocalStorageState from 'use-local-storage-state';

import styles from './favoriteModal.module.scss';

interface Props {
  selectedMovie: IMovieItem;
  setSelectedMovie: (param: null) => void;
}

const FavoriteButton = ({ selectedMovie, setSelectedMovie }: Props) => {
  const [, setFavoriteList] = useLocalStorageState<IMovieItem[]>('favoriteList', {
    ssr: true,
    defaultValue: [],
  });

  const handleOkayClick = () => {
    setFavoriteList((prev) => [selectedMovie, ...prev]);
    setSelectedMovie(null);
  };

  const handleCancelClick = () => {
    setSelectedMovie(null);
  };

  return (
    <div className={styles.modalButton}>
      <h3 className={styles.title}>즐겨찾기 추가</h3>
      <button type='button' onClick={handleOkayClick}>
        확인
      </button>
      <button type='button' onClick={handleCancelClick}>
        취소
      </button>
    </div>
  );
};

const FavoriteModal = (props: Props) => {
  return createPortal(<FavoriteButton {...props} />, document.getElementById('root')!);
};

export default FavoriteModal;
