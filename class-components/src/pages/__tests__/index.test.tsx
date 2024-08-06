import '@testing-library/jest-dom';
import { GetServerSidePropsContext } from 'next';
import { getServerSideProps } from '../index';
import { fetchCharacters } from '../../api/characters';
import { Character } from '../../types/types';
import { vi } from 'vitest';

vi.mock('../../api/characters');

describe('HomePage', () => {
  const characters: Character[] = [
    {
      name: 'Luke Skywalker',
      gender: 'male',
      height: '172',
      eye_color: 'blue',
      homeworld: 'https://swapi.dev/api/planets/1/',
      url: 'https://swapi.dev/api/people/1/',
    },
  ];

  describe('getServerSideProps', () => {
    it('fetches characters and returns them as props', async () => {
      (fetchCharacters as jest.Mock).mockResolvedValue({ characters, totalPages: 1 });

      const context = {
        query: { term: 'Luke', page: '1' },
      } as unknown as GetServerSidePropsContext;

      const result = await getServerSideProps(context);

      expect(result).toEqual({
        props: { initialData: { characters, totalPages: 1 } },
      });
    });

    it('handles errors gracefully', async () => {
      (fetchCharacters as jest.Mock).mockRejectedValue(new Error('API error'));

      const context = {
        query: { term: 'Luke', page: '1' },
      } as unknown as GetServerSidePropsContext;

      const result = await getServerSideProps(context);

      expect(result).toEqual({
        props: { initialData: { characters: [], totalPages: 0 } },
      });
    });
  });
});
