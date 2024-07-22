import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Character } from '../../types/types';

interface SelectedItemsState {
  selectedItems: { [url: string]: Character };
}

const initialState: SelectedItemsState = {
  selectedItems: {},
}

const selectedItemsSlice = createSlice({
  name: 'selectedItems',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Character>) => {
      state.selectedItems[action.payload.url] = action.payload;
    },
    removeItem: (state, action: PayloadAction<string>) => {
      delete state.selectedItems[action.payload];
    },
  },
});

export const { addItem, removeItem } = selectedItemsSlice.actions;
export default selectedItemsSlice.reducer;