import { PayloadAction, createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";

import { RootState } from "../data/store";
import { initialState } from "./common";
import { AccountProfileSummary, Character } from "../data/AccountProfileSummary";

const charactersAdapter = createEntityAdapter<Character>({
  selectId: (character) => character.id,
});

interface FetchAccountProfileSummaryParams {
  region: string,
  namespace: string,
  locale: string,
  accessToken: string,
}

export const fetchAccountProfileSummary = createAsyncThunk("characters/fetchAccountProfileSummary ", async ({ region,  namespace, locale, accessToken }: FetchAccountProfileSummaryParams) => {
  let response;

  try {
    response = await fetch(
      `https://${region}.api.blizzard.com/profile/user/wow?namespace=${namespace}&locale=${locale}`,
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

const charactersSlice = createSlice({
  name: "characters",
  initialState: charactersAdapter.getInitialState(initialState),
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchAccountProfileSummary.pending, (state) => {
      state.status = "loading";
    });

    builder.addCase(fetchAccountProfileSummary.fulfilled, (state, action: PayloadAction<AccountProfileSummary>) => {
      if (action.payload.wow_accounts.length > 0) {
        state.status = "succeeded";
        charactersAdapter.addMany(state, action.payload.wow_accounts[0].characters);
      } else {
        state.status = "failed";
        state.error = "No World of Warcraft accounts found.";
      }
    });

    builder.addCase(fetchAccountProfileSummary.rejected, (state, action) => {
      state.status = "failed";

      if (action.error.message) {
        state.error = action.error.message;
      } else {
        state.error = "Unknown";
      }
    });
  },

});

const selectors = charactersAdapter.getSelectors((state: RootState) => state.characters);

export const selectAllCharacters = selectors.selectAll;

export function selectMaxLevelCharacters(state: RootState) {
  return selectAllCharacters(state).filter((character) => character.level === 60);
}

export default charactersSlice.reducer;
