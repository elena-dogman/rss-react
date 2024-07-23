import React from 'react';
import { Outlet } from 'react-router-dom';
import styles from './RootLayout.module.scss';
import SearchBar from '../components/SearchBar/SearchBar';
import ThemeSelector from '../components/ThemeSelector/ThemeSelector';

const RootLayout: React.FC = () => {
  return (
    <div className={styles.rootLayout}>
      <header className={styles.header}>
        <SearchBar />
        <ThemeSelector />
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
