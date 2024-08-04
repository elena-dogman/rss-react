import React from 'react';
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import dynamic from 'next/dynamic';
import { setupStore } from '../store/store';
import { LoadingProvider } from '../contexts/LoadingContext';
import { SearchProvider } from '../contexts/SearchContext';
import { ThemeProvider } from '../contexts/ThemeContext';
import RootLayout from '../app/layout';
import '../styles/globals.scss';

const store = setupStore();

const BrowserRouter = dynamic(
  () => import('react-router-dom').then((mod) => mod.BrowserRouter),
  { ssr: false }
);

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <SearchProvider>
        <LoadingProvider>
          <ThemeProvider>
            <BrowserRouter>
              <RootLayout>
                <Component {...pageProps} />
              </RootLayout>
            </BrowserRouter>
          </ThemeProvider>
        </LoadingProvider>
      </SearchProvider>
    </Provider>
  );
};

export default MyApp;
