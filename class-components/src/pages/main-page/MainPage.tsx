import React, { useEffect, useState, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './MainPage.module.scss';
import Results from '../../components/Results/Results';
import Loader from '../../components/Loader/Loader';
import CharacterDetails from '../../components/CharacterDetails/CharacterDetails';
import Pagination from '../../components/Pagination/Pagination';
import HomeworldFetcher from '../../components/HomeworldFetcher/HomeworldFetcher';
import { useFetchCharacterDetailsQuery } from '../../store/reducers/apiSlice';
import { setPage, setSearchTerm } from '../../store/reducers/searchSlice';
import { fetchCharacters, setCurrentPage, setHomeworlds } from '../../store/reducers/charactersSlice';
import { DetailProvider } from '../../contexts/DetailContext';
import { Character } from '../../types/types';
import Flyout from '../../components/Flyout/Flyout';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { RootState } from '../../store/store';

const MainPageContent: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const searchParams = new URLSearchParams(location.search);
  const term = searchParams.get('term') || '';
  const page = parseInt(searchParams.get('page') || '1', 10);
  const detailId = searchParams.get('details');

  const { characters, homeworlds, isLoading, totalPages } = useAppSelector((state: RootState) => state.characters);
  const { data: selectedCharacter, isLoading: isDetailLoading } = useFetchCharacterDetailsQuery(detailId || '');
  const [homeworldsState, setHomeworldsState] = useState<{ [url: string]: string }>({});

  const handleHomeworldFetch = useCallback((url: string, name: string) => {
    if (!homeworlds[url]) {
      setHomeworldsState(prev => ({ ...prev, [url]: name }));
      dispatch(setHomeworlds({ ...homeworlds, [url]: name }));
    }
  }, [homeworlds, dispatch]);

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(location.search);
    params.set('page', newPage.toString());
    navigate(`?${params.toString()}`);
    dispatch(setCurrentPage(newPage));
  };

  const handleCharacterClick = (character: Character) => {
    const params = new URLSearchParams(location.search);
    params.set('details', character.url);
    navigate(`?${params.toString()}`);
  };

  const handleCloseDetail = () => {
    const params = new URLSearchParams(location.search);
    params.delete('details');
    navigate(`?${params.toString()}`);
  };

  useEffect(() => {
    dispatch(setSearchTerm(term));
    dispatch(setPage(page));
    dispatch(setCurrentPage(page));
    dispatch(fetchCharacters({ term, page }));
  }, [term, page, dispatch]);

  return (
    <div className={styles.mainPage}>
      {isLoading ? (
        <div className={styles.loaderWrapper}>
          <Loader />
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
            {characters.map(character => (
              <HomeworldFetcher key={character.url} url={character.homeworld} onFetch={handleHomeworldFetch} />
            ))}
            <Pagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} />
          </div>
          {detailId && selectedCharacter && (
            <div className={styles.details}>
              <CharacterDetails
                character={selectedCharacter}
                isLoading={isDetailLoading}
                onClose={handleCloseDetail}
                homeworld={homeworldsState[selectedCharacter.homeworld] || 'Loading...'}
              />
            </div>
          )}
        </div>
      )}
      <Flyout />
    </div>
  );
};

const MainPage: React.FC = () => (
  <DetailProvider>
    <MainPageContent />
  </DetailProvider>
);

export default MainPage;
