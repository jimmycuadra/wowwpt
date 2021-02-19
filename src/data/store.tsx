import { configureStore } from "@reduxjs/toolkit"
import { useDispatch } from "react-redux";

import characterMythicKeystoneProfileIndex from "../redux/characterMythicKeystoneProfileIndex";
import characters from "../redux/characters";

const store = configureStore({
  reducer: {
    characterMythicKeystoneProfileIndex: characterMythicKeystoneProfileIndex,
    characters: characters,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export function useAppDispatch() {
  return useDispatch<AppDispatch>();
}

export interface ThunkApiConfig {
  dispatch: AppDispatch,
  state: RootState,
}

export default store;
