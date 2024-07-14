import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './MainPage.module.scss';
import Results from '../../components/Results/Results';
import Loader from '../../components/Loader/Loader';
import { useSearch } from '../../contexts/useSearch';
import CharacterDetails from '../../components/CharacterDetails/CharacterDetails';
import useCharacters from '../../hooks/useCharacters';
import useCharacterDetails from '../../hooks/useCharacterDetails';
import Pagination from '../../components/Pagination/Pagination';

const MainPage: React.FC = () => {
  const { searchTerm } = useSearch();
  const {
    characters,
    homeworlds,
    currentPage,
    totalPages,
    isLoading,
    handlePageChange,
    fetchCharactersData
  } = useCharacters(searchTerm);
  const {
    selectedCharacter,
    isDetailLoading,
    fetchCharacterDetailsById,
    handleCharacterClick,
    handleCloseDetail,
  } = useCharacterDetails(currentPage);
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const page = parseInt(searchParams.get('frontpage') || '1', 10);
    const detailId = searchParams.get('details');

    if (detailId) {
      fetchCharacterDetailsById(detailId);
    }

    fetchCharactersData(searchTerm, page);
  }, [location.search, searchTerm]);

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
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
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
