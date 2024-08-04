'use client'

import React, { useContext } from 'react';
import Loader from '../Loader/Loader';
import { ThemeContext } from '../../contexts/ThemeContext';
import { useLoading } from '../../contexts/useLoading';

const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const themeContext = useContext(ThemeContext);
  const { isLoading } = useLoading();

  if (!themeContext) return null;

  const { theme } = themeContext;

  return (
    <div className={theme === 'dark' ? 'dark-theme' : 'light-theme'} style={{ position: 'relative', width: '100vw', height: '100vh' }}>
      {isLoading && <Loader />}
      {children}
    </div>
  );
};

export default Wrapper;
