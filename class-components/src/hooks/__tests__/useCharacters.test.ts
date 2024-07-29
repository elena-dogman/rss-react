import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useNavigate } from 'react-router-dom';
import { fetchCharacters, fetchHomeworld } from '../../api/characters';
import useCharacters from '../useCharacters';
import { useSearch } from '../../contexts/useSearch';
import { renderHook, waitFor } from '@testing-library/react';
import { act } from 'react';

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
}));

vi.mock('../../api/characters', () => ({
  fetchHomeworld: vi.fn(),
  fetchCharacters: vi.fn(),
}));

vi.mock('../../contexts/useSearch', () => ({
  useSearch: vi.fn(),
}));

describe('useCharacters', () => {
  const mockNavigate = vi.fn();
  (useNavigate as jest.Mock).mockReturnValue(mockNavigate);

  beforeEach(() => {
    (useSearch as jest.Mock).mockReturnValue({
      searchTerm: 'test',
    });
  });

  it('fetches characters and homeworlds successfully', async () => {
    const mockCharacters = [
      { name: 'Luke Skywalker', homeworld: 'https://swapi.dev/api/planets/1/' },
      { name: 'Darth Vader', homeworld: 'https://swapi.dev/api/planets/1/' },
    ];
    const mockHomeworld = 'Tatooine';
    const mockTotalPages = 1;

    (fetchCharacters as jest.Mock).mockResolvedValue({
      characters: mockCharacters,
      totalPages: mockTotalPages,
    });

    (fetchHomeworld as jest.Mock).mockResolvedValue(mockHomeworld);

    const { result } = renderHook(() => useCharacters());

    await waitFor(() => {
      expect(result.current.characters).toEqual(mockCharacters);
      expect(result.current.totalPages).toBe(mockTotalPages);
      expect(result.current.homeworlds).toEqual({
        'https://swapi.dev/api/planets/1/': mockHomeworld,
      });
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBe(null);
    });
  });

  it('handles errors when fetching characters', async () => {
    const mockError = new Error('Failed to fetch characters');
    (fetchCharacters as jest.Mock).mockRejectedValue(mockError);

    const { result } = renderHook(() => useCharacters());

    await waitFor(() => {
      expect(result.current.error).toBe(
        'Failed to fetch characters. Please try again later.',
      );
      expect(result.current.isLoading).toBe(false);
    });
  });

  it('navigates to the correct page on page change', () => {
    const { result } = renderHook(() => useCharacters());

    act(() => {
      result.current.handlePageChange(2);
    });

    expect(mockNavigate).toHaveBeenCalledWith('/?page=2');
    expect(result.current.currentPage).toBe(2);
  });
});
