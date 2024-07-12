import React, { useState } from 'react';
import styles from './App.module.scss';
import SearchBar from '../SearchBar/SearchBar';
import MainPage from '../../pages/MainPage/MainPage';

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <SearchBar onSearch={handleSearch} />
      </header>
      <MainPage searchTerm={searchTerm} />
    </div>
  );
}


export default App;
