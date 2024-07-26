import React, { useContext } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';

const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const themeContext = useContext(ThemeContext);

  if (!themeContext) return null;

  const { theme } = themeContext;

  return (
    <div className={theme === 'dark' ? 'dark-theme' : 'light-theme'}>
      {children}
    </div>
  );
};

export default Wrapper;
