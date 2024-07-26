import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App/App.js';
import './index.scss';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import { ThemeProvider } from './contexts/ThemeContext';
import Wrapper from './components/Wrapper/Wrapper';


const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <ThemeProvider>
        <Wrapper>
          <ErrorBoundary>
            <App />
          </ErrorBoundary>
        </Wrapper>
      </ThemeProvider>
    </React.StrictMode>,
  );
}
