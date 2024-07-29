import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SearchState {
  term: string;
  page: number;
}

const initialState: SearchState = {
  term: '',
  page: 1,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchTerm(state, action: PayloadAction<string>) {
      state.term = action.payload;
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
  },
});

export const { setSearchTerm, setPage } = searchSlice.actions;
export default searchSlice.reducer;
