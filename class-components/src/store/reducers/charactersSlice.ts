import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Character } from "../../types/types";

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
}

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
    }
  }
});

export const { setCharacters, setHomeworlds, setCurrentPage, setTotalPages, setIsLoading } = characterSlice.actions;
export default characterSlice.reducer;