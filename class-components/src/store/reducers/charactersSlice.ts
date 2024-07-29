import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Character } from '../../types/types';

interface CharacterState {
  characters: Character[];
  homeworlds: { [url: string]: string };
  currentPage: number;
  totalPages: number;
  isLoading: boolean;
}

const initialState: CharacterState = {
  characters: [],
  homeworlds: {},
  currentPage: 1,
  totalPages: 1,
  isLoading: false,
};

interface FetchCharactersArgs {
  term: string;
  page: number;
}

export const fetchCharacters = createAsyncThunk(
  'characters/fetchCharacters',
  async ({ term, page }: FetchCharactersArgs) => {
    const response = await fetch(
      `https://swapi.dev/api/people/?search=${term}&page=${page}`,
    );
    const data = await response.json();
    return { characters: data.results, totalPages: Math.ceil(data.count / 10) };
  },
);

const characterSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    setCharacters(state, action: PayloadAction<Character[]>) {
      state.characters = action.payload;
    },
    setHomeworlds(state, action: PayloadAction<{ [url: string]: string }>) {
      state.homeworlds = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setTotalPages(state, action: PayloadAction<number>) {
      state.totalPages = action.payload;
    },
    setIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharacters.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCharacters.fulfilled, (state, action) => {
        state.characters = action.payload.characters;
        state.totalPages = action.payload.totalPages;
        state.isLoading = false;
      })
      .addCase(fetchCharacters.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const {
  setCharacters,
  setHomeworlds,
  setCurrentPage,
  setTotalPages,
  setIsLoading,
} = characterSlice.actions;
export default characterSlice.reducer;
