import React, { useEffect, useState, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './MainPage.module.scss';
import Results from '../../components/Results/Results';
import CharacterDetails from '../../components/CharacterDetails/CharacterDetails';
import Pagination from '../../components/Pagination/Pagination';
import HomeworldFetcher from '../../components/HomeworldFetcher/HomeworldFetcher';
import { useFetchCharacterDetailsQuery } from '../../store/reducers/apiSlice';
import { setPage, setSearchTerm } from '../../store/reducers/searchSlice';
import {
  fetchCharacters,
  setCurrentPage,
  setHomeworlds,
} from '../../store/reducers/charactersSlice';
import { DetailProvider } from '../../contexts/DetailContext';
import { Character } from '../../types/types';
import Flyout from '../../components/Flyout/Flyout';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { RootState } from '../../store/store';
import { useLoading } from '../../contexts/useLoading';

const MainPageContent: React.FC = () => {
  const { setLoading, isLoading } = useLoading();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const searchParams = new URLSearchParams(location.search);
  const term = searchParams.get('term') || '';
  const page = parseInt(searchParams.get('page') || '1', 10);
  const detailId = searchParams.get('details');

  const { characters, homeworlds, isLoading: charactersLoading, totalPages } = useAppSelector(
    (state: RootState) => state.characters,
  );
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
    setLoading(true);
    dispatch(setCurrentPage(newPage));
    dispatch(fetchCharacters({ term, page: newPage })).finally(() => setLoading(false));
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
    setLoading(true);
    dispatch(setSearchTerm(term));
    dispatch(setPage(page));
    dispatch(setCurrentPage(page));
    dispatch(fetchCharacters({ term, page })).finally(() => setLoading(false));
  }, [term, page, dispatch, setLoading]);

  return (
    <div className={styles.mainPage}>
      {characters.length === 0 && !charactersLoading ? (
        <div className={styles['no-results']} data-testid="no-results">
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
            <Results
              characters={characters}
              homeworlds={homeworlds}
              onCharacterClick={handleCharacterClick}
            />
            {characters.map((character) => (
              <HomeworldFetcher
                key={character.url}
                url={character.homeworld}
                onFetch={handleHomeworldFetch}
              />
            ))}
            {!isLoading && (
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </div>
          {detailId && selectedCharacter && (
            <div className={styles.details}>
              <CharacterDetails
                character={selectedCharacter}
                isLoading={isDetailLoading}
                onClose={handleCloseDetail}
                homeworld={
                  homeworldsState[selectedCharacter.homeworld] || 'Loading...'
                }
              />
            </div>
          )}
        </div>
      )}
      {!isLoading && <Flyout />}
    </div>
  );
};

const MainPage: React.FC = () => (
  <DetailProvider>
    <MainPageContent />
  </DetailProvider>
);

export default MainPage;
