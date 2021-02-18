import { configureStore } from "@reduxjs/toolkit"
import { useDispatch } from "react-redux";

// import postsReducer from "../features/posts/postsSlice"
// import usersReducer from "../features/users/usersSlice"
// import notificationsReducer from "../features/notifications/notificationsSlice";

const store = configureStore({
  reducer: {
    // mythicKeystoneProfiles: mythicKeystoneProfilesReducer,
    // characters: charactersReducer,
    // realms: realmsReducer,
    // races: racesReducer,
    // specializations: specializationsReducer,
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
