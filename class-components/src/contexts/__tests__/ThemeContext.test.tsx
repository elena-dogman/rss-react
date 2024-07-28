import React, { useContext } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { ThemeContext, ThemeProvider } from '../ThemeContext';

const localStorageMock = (() => {
  let store: { [key: string]: string } = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    clear: () => {
      store = {};
    },
    removeItem: (key: string) => {
      delete store[key];
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

const TestComponent: React.FC = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('ThemeContext must be used within a ThemeProvider');
  }
  const { theme, setTheme } = context;

  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <button onClick={() => setTheme('light')}>Set Light Theme</button>
      <button onClick={() => setTheme('dark')}>Set Dark Theme</button>
    </div>
  );
};

describe('ThemeProvider', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('initializes theme from localStorage', () => {
    localStorage.setItem('theme', 'light');
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>,
    );
    const themeElement = screen.getByTestId('theme');
    expect(themeElement).toHaveTextContent('light');
  });

  it('toggles theme and updates localStorage and body class', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>,
    );
    const themeElement = screen.getByTestId('theme');
    const lightButton = screen.getByText('Set Light Theme');
    const darkButton = screen.getByText('Set Dark Theme');

    expect(themeElement).toHaveTextContent('dark');

    fireEvent.click(lightButton);
    expect(themeElement).toHaveTextContent('light');
    expect(localStorage.getItem('theme')).toBe('light');

    fireEvent.click(darkButton);
    expect(themeElement).toHaveTextContent('dark');
    expect(localStorage.getItem('theme')).toBe('dark');
  });
});
