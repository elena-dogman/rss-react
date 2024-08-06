import React, { useEffect, useState, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './MainPage.module.scss';
import Results from '../Results/Results';
import CharacterDetails from '../CharacterDetails/CharacterDetails';
import Pagination from '../Pagination/Pagination';
import HomeworldFetcher from '../HomeworldFetcher/HomeworldFetcher';
import { useFetchCharacterDetailsQuery, useFetchCharactersQuery } from '../../store/reducers/apiSlice';
import { setHomeworlds } from '../../store/reducers/charactersSlice';
import { DetailProvider } from '../../contexts/DetailContext';
import { Character } from '../../types/types';
import Flyout from '../Flyout/Flyout';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { RootState } from '../../store/store';
import { useLoading } from '../../contexts/useLoading';
import yodaImg from '../../../public/assets/yoda.png';

interface MainPageProps {
  initialData: {
    characters: Character[];
    totalPages: number;
  };
}

const MainPageContent: React.FC<MainPageProps> = ({ initialData }) => {
  const { setLoading, isLoading } = useLoading();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const searchParams = new URLSearchParams(location.search);
  const term = searchParams.get('term') || '';
  const page = parseInt(searchParams.get('page') || '1', 10);
  const detailId = searchParams.get('details');

  const { homeworlds, isLoading: charactersLoading } = useAppSelector(
    (state: RootState) => state.characters,
  );
  const { data: selectedCharacter, isLoading: isDetailLoading } = useFetchCharacterDetailsQuery(detailId || '');
  const { data, isFetching } = useFetchCharactersQuery({ term, page });
  const [homeworldsState, setHomeworldsState] = useState<{ [url: string]: string }>({});
  const [characters, setCharacters] = useState<Character[]>(initialData.characters);
  const [totalPages, setTotalPages] = useState<number>(initialData.totalPages);

  useEffect(() => {
    if (data) {
      setCharacters(data.characters);
      setTotalPages(data.totalPages);
    }
  }, [data]);

  const handleHomeworldFetch = useCallback((url: string, name: string) => {
    if (!homeworlds[url]) {
      setHomeworldsState(prev => ({ ...prev, [url]: name }));
      dispatch(setHomeworlds({ ...homeworlds, [url]: name }));
    }
  }, [homeworlds, dispatch]);

  const handlePageChange = useCallback((newPage: number) => {
    const params = new URLSearchParams(location.search);
    params.set('page', newPage.toString());
    navigate(`/?${params.toString()}`);
  }, [location.search, navigate]);

  const handleCharacterClick = useCallback((character: Character) => {
    const params = new URLSearchParams(location.search);
    params.set('details', character.url);
    navigate(`/?${params.toString()}`);
  }, [navigate, location.search]);

  const handleCloseDetail = useCallback(() => {
    const params = new URLSearchParams(location.search);
    params.delete('details');
    navigate(`/?${params.toString()}`);
  }, [navigate, location.search]);

  useEffect(() => {
    setLoading(isFetching);
  }, [isFetching, setLoading]);

  return (
    <div className={styles.mainPage}>
      {characters.length === 0 && !charactersLoading ? (
        <div className={styles['no-results']} data-testid="no-results">
          <img
            src={yodaImg.src}
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

const MainPage: React.FC<MainPageProps> = ({ initialData }) => (
  <DetailProvider>
    <MainPageContent initialData={initialData} />
  </DetailProvider>
);

export default MainPage;
