import { configureStore } from "@reduxjs/toolkit"
import { useDispatch } from "react-redux";

import charactersReducer from "./characters";

const storedState = localStorage.getItem("state");

const initialState = storedState ? JSON.parse(storedState) : {};

const store = configureStore({
  reducer: {
    characters: charactersReducer,
  },
  preloadedState: initialState,
});

store.subscribe(() => {
  localStorage.setItem("state", JSON.stringify(store.getState()));
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export function useAppDispatch() {
  return useDispatch<AppDispatch>();
}

export default store;
