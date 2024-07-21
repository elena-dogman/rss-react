import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Character } from '../../types/types'

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.dev/api/' }),
  endpoints: (builder) => ({
    fetchCharacters: builder.query<{ characters: Character[], totalPages: number }, { term: string, page: number }>({
      query: ({ term, page }) => `people/?search=${term}&page=${page}`,
      transformResponse: (response: { count: number, results: Character[] }) => ({
        characters: response.results,
        totalPages: Math.ceil(response.count / 10),
      }),
    }),
    fetchCharacterDetails: builder.query<Character, string>({
      query: (url) => url,
    }),
    fetchHomeworld: builder.query<string, string>({
      query: (url) => url,
      transformResponse: (response: { name: string }) => response.name,
    }),
  }),
});

export const { useFetchCharactersQuery, useFetchCharacterDetailsQuery, useFetchHomeworldQuery } = apiSlice;