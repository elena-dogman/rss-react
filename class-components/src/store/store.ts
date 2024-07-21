import { combineReducers, configureStore } from "@reduxjs/toolkit";
import searchReducer from './reducers/searchSlice';
import charactersReducer from './reducers/charactersSlice';
import selectedCharacterReducer from './reducers/selectedCharacterSlice';
import { apiSlice } from "./reducers/apiSlice";


const rootReducer = combineReducers({
  search: searchReducer,
  characters: charactersReducer,
  selectedCharacter: selectedCharacterReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiSlice.middleware),
  });
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']