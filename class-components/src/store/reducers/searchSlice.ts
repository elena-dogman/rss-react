import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SearchState {
  searchTerm: string;
}

const initialState: SearchState = {
  searchTerm: '',
}

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSeachTerm(state, action: PayloadAction<string>) {
      state.searchTerm = action.payload;
    }
  }
});

export const { setSeachTerm } = searchSlice.actions;
export default searchSlice.reducer