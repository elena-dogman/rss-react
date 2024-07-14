import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styles from './App.module.scss';
import MainPage from '../../pages/main-page/MainPage';
import NotFoundPage from '../../pages/not-found-page/NotFoundPage';
import { SearchProvider } from '../../contexts/SearchContext';
import RootLayout from '../../layouts/root-layout';
import CharacterDetails from '../CharacterDetails/CharacterDetails';

const App: React.FC = () => {
  return (
    <div className={styles.app}>
      <SearchProvider>
        <Router>
          <Routes>
            <Route path="/" element={<RootLayout />}>
              <Route index element={<MainPage />} />
              <Route path="details/:id" element={<CharacterDetails character={null} isLoading={false} onClose={function (): void {
                throw new Error('Function not implemented.');
              } } homeworld={''} />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </Router>
      </SearchProvider>
    </div>
  );
};

export default App;
