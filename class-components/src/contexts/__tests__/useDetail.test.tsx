import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Character, DetailedCharacter } from '../../types/types';
import { DetailProviderMock } from '../DetailContextMock';
import useDetail from '../useDetail';


const mockCharacter: Character = {
  name: 'Luke Skywalker',
  gender: 'male',
  height: '172',
  eye_color: 'blue',
  homeworld: 'http://swapi.dev/api/planets/1/',
  url: 'http://swapi.dev/api/people/1/',
};

const mockDetailedCharacter: DetailedCharacter = {
  ...mockCharacter,
  birth_year: '19BBY',
  mass: '77',
  skin_color: 'fair',
};

describe('useDetail', () => {
  it('should use the detail context when inside a DetailProvider', () => {
    const mockContextValue = {
      selectedCharacter: mockDetailedCharacter,
      isDetailLoading: false,
      fetchCharacterDetailsById: vi.fn(),
      handleCharacterClick: vi.fn(),
      handleCloseDetail: vi.fn(),
    };

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <DetailProviderMock value={mockContextValue}>{children}</DetailProviderMock>
    );

    const { result } = renderHook(() => useDetail(), { wrapper });

    expect(result.current).toBe(mockContextValue);
  });
});
