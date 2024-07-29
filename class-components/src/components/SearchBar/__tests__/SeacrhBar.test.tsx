import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import SearchBar from '../SearchBar';
import { SearchProvider } from '../../../contexts/SearchContext';

describe('SearchBar Component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should save the entered value to local storage when the Search button is clicked', () => {
    render(
      <MemoryRouter>
        <SearchProvider>
          <SearchBar />
        </SearchProvider>
      </MemoryRouter>,
    );

    const input = screen.getByPlaceholderText('Search for characters');
    const searchButton = screen.getByRole('button', { name: /search/i });

    fireEvent.change(input, { target: { value: 'Luke Skywalker' } });
    fireEvent.click(searchButton);

    expect(localStorage.getItem('searchTerm')).toBe('Luke Skywalker');
  });

  it('should retrieve the value from local storage upon mounting', () => {
    localStorage.setItem('searchTerm', 'Leia Organa');

    render(
      <MemoryRouter>
        <SearchProvider>
          <SearchBar />
        </SearchProvider>
      </MemoryRouter>,
    );

    const input = screen.getByPlaceholderText('Search for characters');
    expect(input).toHaveValue('Leia Organa');
  });
});
