import React, { useState, useEffect, useCallback } from 'react';
import { fetchCharacters, fetchHomeworld, fetchCharacterDetails, Character } from '../../api/characters';
import styles from './MainPage.module.scss';
import Results from '../../components/Results/Results';
import Loader from '../../components/Loader/Loader';
import { useSearch } from '../../contexts/useSearch';
import { useLocation, useNavigate } from 'react-router-dom';
import CharacterDetails, { DetailedCharacter } from '../../components/CharacterDetails/CharacterDetails';

const MainPage: React.FC = () => {
  const { searchTerm } = useSearch();
  const [characters, setCharacters] = useState<Character[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [homeworlds, setHomeworlds] = useState<{ [url: string]: string }>({});
  const [selectedCharacter, setSelectedCharacter] = useState<DetailedCharacter | null>(null);
  const [isDetailLoading, setIsDetailLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const page = parseInt(searchParams.get('frontpage') || '1', 10);
    const detailId = searchParams.get('details');

    if (detailId) {
      fetchCharacterDetailsById(detailId);
    }

    setCurrentPage(page);
    fetchCharactersData(searchTerm, page);
  }, [location.search, searchTerm]);

  const fetchHomeworlds = useCallback(async (characters: Character[]) => {
    const homeworldsPromises = characters.map(async (character) => {
      if (!homeworlds[character.homeworld]) {
        const name = await fetchHomeworld(character.homeworld);
        return { url: character.homeworld, name };
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
  }, [homeworlds]);

  const fetchCharactersData = useCallback(async (term: string, page: number) => {
    setIsLoading(true);
    try {
      const { characters, totalPages } = await fetchCharacters(term, page);
      setCharacters(characters);
      setCurrentPage(page);
      setTotalPages(totalPages);
      await fetchHomeworlds(characters);
    } catch (error) {
      console.error('Error fetching characters:', error);
    } finally {
      setIsLoading(false);
    }
  }, [fetchHomeworlds]);

  const fetchCharacterDetailsById = async (id: string) => {
    setIsDetailLoading(true);
    try {
      const character = await fetchCharacterDetails(id);
      setSelectedCharacter(character as DetailedCharacter);
    } catch (error) {
      console.error('Error fetching character details:', error);
    } finally {
      setIsDetailLoading(false);
    }
  };

  const handleCharacterClick = (character: Character) => {
    navigate(`/?frontpage=${currentPage}&details=${character.url}`);
    fetchCharacterDetailsById(character.url);
  };

  const handleCloseDetail = () => {
    navigate(`/?frontpage=${currentPage}`);
    setSelectedCharacter(null);
  };

  const handlePageChange = (page: number) => {
    navigate(`/?frontpage=${page}`);
    fetchCharactersData(searchTerm, page);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
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
        <div className={styles.content}>
          <div className={styles.results}>
            <Results characters={characters} homeworlds={homeworlds} onCharacterClick={handleCharacterClick} />
            {renderPagination()}
          </div>
          {selectedCharacter && (
            <div className={styles.details}>
              <CharacterDetails
                character={selectedCharacter}
                isLoading={isDetailLoading}
                onClose={handleCloseDetail}
                homeworld={selectedCharacter ? homeworlds[selectedCharacter.homeworld] : 'Loading...'}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MainPage;
