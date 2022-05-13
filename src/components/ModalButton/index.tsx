import styles from './modalButton.module.scss';

const ModalButton = () => {
  return (
    <div>
      <button type='button'>
        <h3>즐겨찾기 추가</h3>
        <button className={styles.modalButton} type='button'>
          확인
        </button>
        <button className={styles.modalButton} type='button'>
          취소
        </button>
      </button>
    </div>
  );
};

export default ModalButton;
