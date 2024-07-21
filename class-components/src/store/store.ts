import { combineReducers, configureStore } from "@reduxjs/toolkit";
import searchReducer from './reducers/searchSlice';
import charactersReducer from './reducers/charactersSlice';
import selectedCharacterReducer from './reducers/selectedCharacterSlice';

const rootReducer = combineReducers({
  search: searchReducer,
  characters: charactersReducer,
  selectedCharacter: selectedCharacterReducer,
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']