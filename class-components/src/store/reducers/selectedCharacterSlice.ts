import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DetailedCharacter } from "../../components/CharacterDetails/CharacterDetails";

interface SelectedCharacterState {
  character: DetailedCharacter | null;
  isLoading: boolean;
}

const initialState: SelectedCharacterState = {
  character: null,
  isLoading: false,
}

const selectedCharacterSlice = createSlice({
  name: 'selectedCharacter',
  initialState,
  reducers: {
    setSelectedCharacter(state, action: PayloadAction<DetailedCharacter | null>) {
      state.character = action.payload;
    },
    setIsLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    }
  }
});

export const { setSelectedCharacter, setIsLoading } = selectedCharacterSlice.actions;
export default selectedCharacterSlice.reducer;