import { describe, it, expect, vi } from 'vitest';
import { useNavigate } from 'react-router-dom';
import { renderHook, waitFor, act } from '@testing-library/react';
import { fetchCharacterDetails } from '../../api/characters';
import { Character, DetailedCharacter } from '../../types/types';
import useCharacterDetails from '../useCharacterDetails';

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
}));

vi.mock('../../api/characters', () => ({
  fetchCharacterDetails: vi.fn(),
}));

describe('useCharacterDetails', () => {
  const mockNavigate = vi.fn();
  (useNavigate as jest.Mock).mockReturnValue(mockNavigate);

  const character: Character = {
    url: '1',
    name: 'Test Character',
    gender: '',
    height: '',
    eye_color: '',
    homeworld: '',
  };
  const detailedCharacter: DetailedCharacter = {
    name: 'Detailed Test Character',
    birth_year: '19BBY',
    gender: 'male',
    height: '172',
    mass: '77',
    eye_color: 'blue',
    skin_color: 'fair',
    homeworld: 'https://swapi.dev/api/planets/1/',
    url: 'https://swapi.dev/api/people/1/',
  };

  it('fetches character details by ID', async () => {
    (fetchCharacterDetails as jest.Mock).mockResolvedValue(detailedCharacter);

    const { result } = renderHook(() => useCharacterDetails(1));

    await act(async () => {
      await result.current.fetchCharacterDetailsById('1');
    });

    await waitFor(() => {
      expect(result.current.selectedCharacter).toEqual(detailedCharacter);
      expect(result.current.isDetailLoading).toBe(false);
    });
  });

  it('handles character click and navigates correctly', async () => {
    (fetchCharacterDetails as jest.Mock).mockResolvedValue(detailedCharacter);

    const { result } = renderHook(() => useCharacterDetails(1));

    await act(async () => {
      result.current.handleCharacterClick(character);
    });

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/?frontpage=1&details=1');
      expect(result.current.selectedCharacter).toEqual(detailedCharacter);
    });
  });

  it('handles closing detail and navigates correctly', () => {
    const { result } = renderHook(() => useCharacterDetails(1));

    act(() => {
      result.current.handleCloseDetail();
    });

    waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/?frontpage=1');
      expect(result.current.selectedCharacter).toBe(null);
    });
  });
});
