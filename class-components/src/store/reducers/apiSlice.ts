import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Character, DetailedCharacter } from '../../types/types';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.dev/api/' }),
  endpoints: (builder) => ({
    fetchCharacters: builder.query<
      { characters: Character[]; totalPages: number },
      { term: string; page: number }
    >({
      query: ({ term, page }) => `people/?search=${term}&page=${page}`,
      transformResponse: (response: {
        results: Character[];
        count: number;
      }) => ({
        characters: response.results,
        totalPages: Math.ceil(response.count / 10),
      }),
    }),
    fetchCharacterDetails: builder.query<DetailedCharacter, string>({
      query: (url) => url,
    }),
    fetchHomeworld: builder.query<{ name: string }, string>({
      query: (url) => url,
    }),
  }),
});

export const {
  useFetchCharactersQuery,
  useFetchCharacterDetailsQuery,
  useFetchHomeworldQuery,
} = apiSlice;
