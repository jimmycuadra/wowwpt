import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";

import { RootState } from "../db/store";
import { Profile } from "../db/MythicKeystoneProfile";

interface ProfileState {
  status: "idle" | "loading" | "succeeded" | "failed",
  error: string | null,
}

const profilesAdapter = createEntityAdapter<Profile>({
  selectId: (profile: Profile) => profile.character.id,
});

const initialState = profilesAdapter.getInitialState({
  status: "idle",
  error: null,
} as ProfileState);

interface FetchProfileParams {
  region: string,
  realm: string,
  characterName: string,
  namespace: string,
  locale: string,
  accessToken: string,
}

export const fetchProfile = createAsyncThunk("mythicKeystoneProfiles/fetchProfile", async ({ region, realm, characterName, namespace, locale, accessToken }: FetchProfileParams) => {
    let response = await fetch(
      `https://${region}.api.blizzard.com/profile/wow/character/${realm}/${characterName}/mythic-keystone-profile?namespace=${namespace}&locale=${locale}`,
      {
        headers: {
          "Authorization": `Bearer ${accessToken}`
        }
      }
    );

    if (response.ok) {
      return response.json();
    } else {
      return Promise.reject(`${response.status} ${response.statusText}`);
    }
});

const profilesSlice = createSlice({
  name: "mythicKeystoneProfiles",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchProfile.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(fetchProfile.fulfilled, (state, action) => {
      state.status = "succeeded";

      profilesAdapter.addOne(state, action.payload);
    });

    builder.addCase(fetchProfile.rejected, (state, action) => {
      state.status = "failed";

      if (action.error.message) {
        state.error = action.error.message;
      } else {
        state.error = "Unknown";
      }
    });
  },
});

export const {
  selectAll: selectAllProfiles,
} = profilesAdapter.getSelectors((state: RootState) => state.mythicKeystoneProfiles);

export default profilesSlice.reducer;
