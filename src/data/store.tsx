import { configureStore } from "@reduxjs/toolkit"
import { useDispatch } from "react-redux";

import characterMythicKeystoneProfileIndex from "../redux/characterMythicKeystoneProfileIndex";

const store = configureStore({
  reducer: {
    characterMythicKeystoneProfileIndex: characterMythicKeystoneProfileIndex,
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
