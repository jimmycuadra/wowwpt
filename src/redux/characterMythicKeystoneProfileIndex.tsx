import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";

import { RootState } from "../data/store";
import { initialState } from "./common";
import { CharacterMythicKeystoneProfileIndex } from "../data/CharacterMythicKeystoneProfileIndex";

const characterMythicKeystoneProfileIndexAdapter = createEntityAdapter<CharacterMythicKeystoneProfileIndex>({
  selectId: (profile) => profile.character.id,
});

interface FetchProfileParams {
  region: string,
  realm: string,
  characterName: string,
  namespace: string,
  locale: string,
  accessToken: string,
}

export const fetchCharacterMythicKeystoneProfileIndex = createAsyncThunk("characterMythicKeystoneProfileIndex/fetchCharacterMythicKeystoneProfileIndex ", async ({ region, realm, characterName, namespace, locale, accessToken }: FetchProfileParams) => {
  let response;

  try {
    response = await fetch(
      `https://${region}.api.blizzard.com/profile/wow/character/${realm}/${characterName}/mythic-keystone-profile?namespace=${namespace}&locale=${locale}`,
      {
        headers: {
          "Authorization": `Bearer ${accessToken}`
        }
      }
    );
  } catch (error) {
    return Promise.reject(error.toString());
  }

  if (response.ok) {
    return response.json();
  } else {
    return Promise.reject(`${response.status} ${response.statusText}`);
  }
});

const profilesSlice = createSlice({
  name: "characterMythicKeystoneProfileIndex",
  initialState: characterMythicKeystoneProfileIndexAdapter.getInitialState(initialState),
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchCharacterMythicKeystoneProfileIndex.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(fetchCharacterMythicKeystoneProfileIndex.fulfilled, (state, action) => {
      state.status = "succeeded";

      characterMythicKeystoneProfileIndexAdapter.addOne(state, action.payload);
    });

    builder.addCase(fetchCharacterMythicKeystoneProfileIndex.rejected, (state, action) => {
      state.status = "failed";

      if (action.error.message) {
        state.error = action.error.message;
      } else {
        state.error = "Unknown";
      }
    });
  },
});

const selectors = characterMythicKeystoneProfileIndexAdapter.getSelectors((state: RootState) => state.characterMythicKeystoneProfileIndex);

export const selectAllCharacterMythicKeystoneProfileIndexes = selectors.selectAll;

export function selectAllCharacterMythicKeystoneProfileIndexByCharacterName(state: RootState, characterName: string, realmSlug: string) {
  return selectAllCharacterMythicKeystoneProfileIndexes(state).find((profile) => {
    const character = profile.character;

    return character.name.toLowerCase() === characterName && character.realm.slug === realmSlug;
  });
}

export default profilesSlice.reducer;
