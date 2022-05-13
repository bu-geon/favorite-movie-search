import styles from './loading.module.scss';

const Loading = () => {
  return (
    <div className={styles.loadingContainer}>
      <h1>검색중</h1>
      <div className={styles.loading} />
    </div>
  );
};

export default Loading;
