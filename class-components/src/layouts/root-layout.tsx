import React from 'react';
import { Outlet } from 'react-router-dom';
import styles from './RootLayout.module.scss';
import SearchBar from '../components/SearchBar/SearchBar';

const RootLayout: React.FC = () => {
  return (
    <div className={styles.rootLayout}>
      <header className={styles.header}>
        <SearchBar />
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
