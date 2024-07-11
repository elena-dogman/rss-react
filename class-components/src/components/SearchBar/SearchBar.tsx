import React, { useEffect, useState } from 'react';
import styles from './SearchBar.module.scss';

interface SearchBarProps {
  onSearch: (term: string) => void;
}

const useSearchTerm = () => {
  const [searchTerm, setSearchTerm] = useState(localStorage.getItem('searchTerm') || '');

  useEffect(() => {
    return () => {
      localStorage.setItem('searchTerm', searchTerm)
    };
  }, [searchTerm]);

  return [searchTerm, setSearchTerm] as const;
};

const SearchBar: React.FC<SearchBarProps> = ( {onSearch} ) => {
  const [searchTerm, setSearchTerm] = useSearchTerm();
  const [placeholder] = useState('Search for characters');

 const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

 const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch(searchTerm);
    localStorage.setItem('searchTerm', searchTerm);
  };

    return (
      <form className={styles.search} onSubmit={handleSubmit}>
        <input
          type="text"
          className={styles['search-input']}
          value={searchTerm}
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
  }

export default SearchBar;
