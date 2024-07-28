import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SearchBar.module.scss';
import { useSearch } from '../../contexts/useSearch';

const useSearchTerm = () => {
  const [searchTerm, setSearchTerm] = useState(
    localStorage.getItem('searchTerm') || '',
  );

  useEffect(() => {
    localStorage.setItem('searchTerm', searchTerm);
  }, [searchTerm]);

  return [searchTerm, setSearchTerm] as const;
};

const SearchBar: React.FC = () => {
  const { setSearchTerm } = useSearch();
  const [localSearchTerm, setLocalSearchTerm] = useSearchTerm();
  const [placeholder] = useState('Search for characters');
  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSearchTerm(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSearchTerm(localSearchTerm);
    navigate(`/?term=${localSearchTerm}&page=1`);
  };

  return (
    <form className={styles.search} onSubmit={handleSubmit}>
      <input
        type="text"
        className={styles['search-input']}
        value={localSearchTerm}
        onChange={handleChange}
        placeholder={placeholder}
      />
      <button className={styles['search-button']} type="submit">
        <img
          src="/assets/search.png"
          alt="Search"
          className={styles['search-image']}
        />
      </button>
    </form>
  );
};

export default SearchBar;
