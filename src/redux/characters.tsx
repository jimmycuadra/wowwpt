import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

import { RootState } from "./store";
import { Character } from "../model/character";

const charactersAdapter = createEntityAdapter<Character>({
  selectId: (character) => `${character.name}-${character.realm}-${character.region}`,
});

const characters = createSlice({
  name: "characters",
  initialState: charactersAdapter.getInitialState(),
  reducers: {
    addCharacter(state, action) {
      charactersAdapter.addOne(state, action.payload);
    }
  },
});

export const {
  selectAll: selectAllCharacters,
} = charactersAdapter.getSelectors((state: RootState) => state.characters);

export const {
  addCharacter,
} = characters.actions;

export default characters.reducer;
