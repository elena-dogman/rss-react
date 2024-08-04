import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styles from './App.module.scss';
import MainPage from '../main-page/MainPage';
import NotFoundPage from '../not-found-page/NotFoundPage';
import { SearchProvider } from '../../contexts/SearchContext';
import RootLayout from '../../layouts/root-layout';
import CharacterDetails from '../CharacterDetails/CharacterDetails';
import { setupStore } from '../../store/store';
import { Provider } from 'react-redux';
import { LoadingProvider } from '../../contexts/LoadingContext';
import Wrapper from '../Wrapper/Wrapper';

const store = setupStore();

const App: React.FC = () => {
  return (
    <div className={styles.app}>
      <Provider store={store}>
        <SearchProvider>
          <LoadingProvider>
            <Wrapper>
              <Router>
                <Routes>
                  <Route path="/" element={<RootLayout />}>
                    <Route index element={<MainPage />} />
                    <Route
                      path="details/:id"
                      element={
                        <CharacterDetails
                          character={null}
                          isLoading={false}
                          onClose={function (): void {
                            throw new Error('Function not implemented.');
                          }}
                          homeworld={''}
                        />
                      }
                    />
                    <Route path="*" element={<NotFoundPage />} />
                  </Route>
                </Routes>
              </Router>
            </Wrapper>
          </LoadingProvider>
        </SearchProvider>
      </Provider>
    </div>
  );
};

export default App;
