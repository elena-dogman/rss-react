import React, { useContext } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import { SearchContext, SearchProvider } from '../SearchContext';

const TestComponent: React.FC = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('SearchContext must be used within a SearchProvider');
  }
  const { searchTerm, setSearchTerm } = context;

  return (
    <div>
      <span data-testid="search-term">{searchTerm}</span>
      <button onClick={() => setSearchTerm('New Term')}>Set Search Term</button>
    </div>
  );
};

describe('SearchProvider', () => {
  it('should provide default value', () => {
    render(
      <SearchProvider>
        <TestComponent />
      </SearchProvider>
    );

    const searchTermElement = screen.getByTestId('search-term');
    expect(searchTermElement).toHaveTextContent('');
  });

  it('should update search term', () => {
    render(
      <SearchProvider>
        <TestComponent />
      </SearchProvider>
    );

    const searchTermElement = screen.getByTestId('search-term');
    const button = screen.getByText('Set Search Term');

    fireEvent.click(button);

    expect(searchTermElement).toHaveTextContent('New Term');
  });
});
