import { Routes, Route } from 'react-router-dom';

import GNB from './_shared/GNB';
import SearchMovie from './SearchMovie';
import Favorite from './Favorite';
import styles from './Routes.module.scss';

const App = () => {
  return (
    <div className={styles.app}>
      <div className={styles.searchMovie}>
        <main>
          <Routes>
            <Route path='/' element={<SearchMovie />} />
            <Route path='search' element={<SearchMovie />} />
            <Route path='favorite' element={<Favorite />} />
            <Route path='*' element={<div>404</div>} />
          </Routes>
        </main>
        <footer>
          <GNB />
        </footer>
      </div>
    </div>
  );
};

export default App;
