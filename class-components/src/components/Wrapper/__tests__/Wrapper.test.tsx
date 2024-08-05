import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi } from 'vitest';
import Wrapper from '../Wrapper';
import { ThemeContext } from '../../../contexts/ThemeContext';
import LoadingContext from '../../../contexts/LoadingContext';

vi.mock('../Loader/Loader', () => ({
  __esModule: true,
  default: () => <div data-testid="loader">Loading...</div>,
}));

const renderWithProviders = (ui: React.ReactElement, { theme = 'light', isLoading = false } = {}) => {
  const setTheme = vi.fn();
  const setLoading = vi.fn();
  return render(
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <LoadingContext.Provider value={{ isLoading, setLoading }}>
        {ui}
      </LoadingContext.Provider>
    </ThemeContext.Provider>
  );
};

describe('Wrapper Component', () => {
  it('should not display loader when isLoading is false', () => {
    renderWithProviders(<Wrapper><div>Content</div></Wrapper>, { isLoading: false });
    expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
  });

  it('should apply dark theme when theme is dark', () => {
    renderWithProviders(<Wrapper><div>Content</div></Wrapper>, { theme: 'dark' });
    expect(screen.getByText('Content').parentElement).toHaveClass('dark-theme');
  });

  it('should apply light theme when theme is light', () => {
    renderWithProviders(<Wrapper><div>Content</div></Wrapper>, { theme: 'light' });
    expect(screen.getByText('Content').parentElement).toHaveClass('light-theme');
  });
});