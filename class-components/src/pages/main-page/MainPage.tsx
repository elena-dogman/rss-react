import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './MainPage.module.scss';
import Results from '../../components/Results/Results';
import Loader from '../../components/Loader/Loader';
import CharacterDetails from '../../components/CharacterDetails/CharacterDetails';
import useCharacters from '../../hooks/useCharacters';
import { DetailProvider } from '../../contexts/DetailContext';
import Pagination from '../../components/Pagination/Pagination';
import useDetail from '../../contexts/useDetail';

const MainPageContent: React.FC = () => {
  const {
    characters,
    homeworlds,
    currentPage,
    totalPages,
    isLoading,
    handlePageChange,
    fetchCharactersData
  } = useCharacters();
  const {
    selectedCharacter,
    isDetailLoading,
    handleCloseDetail,
  } = useDetail();
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const page = parseInt(searchParams.get('page') || '1', 10);
    fetchCharactersData(page);
  }, [location.search]);

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
            <Results characters={characters} homeworlds={homeworlds} />
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

const MainPage: React.FC = () => (
  <DetailProvider>
    <MainPageContent />
  </DetailProvider>
);

export default MainPage;
