import { configureStore } from "@reduxjs/toolkit"
import { useDispatch } from "react-redux";

import mythicKeystoneProfilesReducer from "../reducers/MythicKeystoneProfile";

const store = configureStore({
  reducer: {
    mythicKeystoneProfiles: mythicKeystoneProfilesReducer,
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
