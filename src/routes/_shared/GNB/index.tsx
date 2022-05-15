import { NavLink } from 'react-router-dom';
import cx from 'classnames';

import styles from './gnb.module.scss';

const LINKS = [
  { title: '검색', to: '/' },
  { title: '즐겨찾기', to: 'favorite' },
];

const GNB = () => {
  return (
    <nav className={styles.gnb}>
      <ul>
        {LINKS.map((link) => (
          <li key={link.to}>
            <NavLink
              className={({ isActive }) => cx(styles.navLink, { [styles.active]: isActive })}
              to={link.to}
              defaultValue={link.title}
            >
              {link.title}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default GNB;
