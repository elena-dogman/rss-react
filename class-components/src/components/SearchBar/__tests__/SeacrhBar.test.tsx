import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, beforeEach, vi } from 'vitest';
import SearchBar from '../SearchBar';
import TestSearchProvider from '../../../contexts/TestSearchProvider';

describe('SearchBar Component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should save the entered value to local storage when the Search button is clicked', () => {
    const setSearchTermMock = vi.fn();
    render(
      <TestSearchProvider value={{ searchTerm: '', setSearchTerm: setSearchTermMock }}>
        <SearchBar />
      </TestSearchProvider>
    );

    const input = screen.getByPlaceholderText('Search for characters');
    const searchButton = screen.getByRole('button', { name: /search/i });

    fireEvent.change(input, { target: { value: 'Luke Skywalker' } });
    fireEvent.click(searchButton);

    expect(localStorage.getItem('searchTerm')).toBe('Luke Skywalker');
    expect(setSearchTermMock).toHaveBeenCalledWith('Luke Skywalker');
  });

  it('should retrieve the value from local storage upon mounting', () => {
    localStorage.setItem('searchTerm', 'Leia Organa');

    const setSearchTermMock = vi.fn();
    render(
      <TestSearchProvider value={{ searchTerm: '', setSearchTerm: setSearchTermMock }}>
        <SearchBar />
      </TestSearchProvider>
    );

    const input = screen.getByPlaceholderText('Search for characters');
    expect(input).toHaveValue('Leia Organa');
  });
});
