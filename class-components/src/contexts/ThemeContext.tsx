import React, { createContext, useEffect, useState, ReactNode } from 'react';

interface ThemeContextProps {
  theme: string;
  setTheme: (theme: string) => void;
}

export const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const themeFile = theme === 'dark' ? 'dark-theme.css' : 'light-theme.css';
    const link = document.getElementById('theme-style') as HTMLLinkElement;
    if (link) {
      link.href = themeFile;
    } else {
      const newLink = document.createElement('link');
      newLink.id = 'theme-style';
      newLink.rel = 'stylesheet';
      newLink.href = themeFile;
      document.head.appendChild(newLink);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
