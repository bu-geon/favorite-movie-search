import styles from './pageTitle.module.scss';

const PageTitle = ({ title }: { title: string }) => {
  return <h1 className={styles.pageTitle}>{title}</h1>;
};

export default PageTitle;
