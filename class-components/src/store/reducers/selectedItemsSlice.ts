import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Character } from '../../types/types';

interface SelectedItemsState {
  selectedItems: { [url: string]: Character };
}

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('selectedItems');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error("Could not load state", err);
    return undefined;
  }
};

const saveState = (state: SelectedItemsState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('selectedItems', serializedState);
  } catch (err) {
    console.error("Could not save state", err);
  }
};

const initialState: SelectedItemsState = loadState() || {
  selectedItems: {},
};

const selectedItemsSlice = createSlice({
  name: 'selectedItems',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Character>) => {
      state.selectedItems[action.payload.url] = action.payload;
      saveState(state);
    },
    removeItem: (state, action: PayloadAction<string>) => {
      delete state.selectedItems[action.payload];
      saveState(state);
    },
    clearItems: (state) => {
      state.selectedItems = {};
      saveState(state);
    }
  },
});

export const { addItem, removeItem, clearItems } = selectedItemsSlice.actions;
export default selectedItemsSlice.reducer;
