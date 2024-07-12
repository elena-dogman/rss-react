import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import styles from './MainPage.module.scss';
import Results from '../components/Results/Results';
import Loader from '../components/Loader/Loader';

interface Character {
  name: string;
  birth_year: string;
  gender: string;
  height: string;
  eye_color: string;
  homeworld: string;
  url: string;
}

interface MainPageProps {
  searchTerm: string;
}

const MainPage: React.FC<MainPageProps> = ({ searchTerm }) => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [homeworlds, setHomeworlds] = useState<{ [url: string]: string }>({});

  const fetchHomeworlds = useCallback(async (characters: Character[]) => {
    const homeworldsPromises = characters.map(async (character) => {
      if (!homeworlds[character.homeworld]) {
        const response = await axios.get(character.homeworld);
        return { url: character.homeworld, name: response.data.name };
      }
      return null;
    });

    const homeworldsData = await Promise.all(homeworldsPromises);
    const newHomeworlds: { [url: string]: string } = {};

    homeworldsData.forEach((homeworld) => {
      if (homeworld) {
        newHomeworlds[homeworld.url] = homeworld.name;
      }
    });

    setHomeworlds((prevHomeworlds) => ({
      ...prevHomeworlds,
      ...newHomeworlds,
    }));
    setIsLoading(false);
  }, [homeworlds]);

  const fetchCharacters = useCallback((term: string, page: number) => {
    setIsLoading(true);
    fetch(`https://swapi.dev/api/people/?search=${term}&page=${page}`)
      .then((response) => response.json())
      .then((data) => {
        const totalPages = Math.ceil(data.count / 10);
        setCharacters(data.results);
        setCurrentPage(page);
        setTotalPages(totalPages);
        fetchHomeworlds(data.results);
      })
      .catch((error) => {
        console.error('Error fetching characters:', error);
        setIsLoading(false);
      });
  }, [fetchHomeworlds]);

  useEffect(() => {
    const savedSearchTerm = localStorage.getItem('searchTerm') || searchTerm;
    fetchCharacters(savedSearchTerm, 1);
  }, [searchTerm, fetchCharacters]);

  const handlePageChange = (page: number) => {
    fetchCharacters(searchTerm, page);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      fetchCharacters(searchTerm, currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      fetchCharacters(searchTerm, currentPage - 1);
    }
  };

  const renderPagination = () => {
    if (characters.length === 0) {
      return null;
    }

    return (
      <div className={styles.pagination}>
        <button
          className={styles.pageButton}
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          &lt;
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            className={`${styles.pageButton} ${currentPage === page ? styles.activePage : ''}`}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </button>
        ))}
        <button
          className={styles.pageButton}
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          &gt;
        </button>
      </div>
    );
  };

  return (
    <div className={styles.mainPage}>
      {isLoading ? (
        <div className={styles.loaderWrapper}>
          <Loader />
          <span className={styles.loadingText}>Loading</span>
        </div>
      ) : characters.length === 0 ? (
        <div className={styles['no-results']}>
          <img
            src="/assets/yoda.png"
            className={styles['no-results-image']}
            alt="Yoda"
          />
          <div className={styles['no-results-content']}>
            <h1 className={styles['no-results-title']}>
              FOUND NO RESULTS YOU HAVE
            </h1>
            <p className={styles['no-results-text']}>
              Change your search query you must
            </p>
          </div>
        </div>
      ) : (
        <Results characters={characters} homeworlds={homeworlds} />
      )}
      {renderPagination()}
    </div>
  );
};

export default MainPage;
