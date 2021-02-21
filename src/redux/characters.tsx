import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

import { RootState } from "./store";
import { Character } from "../model/character";

const charactersAdapter = createEntityAdapter<Character>();

const initialState = charactersAdapter.getInitialState({
  current: null,
  nextId: 1,
} as {
  current: number | null,
  nextId: number,
});

const characters = createSlice({
  name: "characters",
  initialState,
  reducers: {
    addCharacter(state, action) {
      charactersAdapter.addOne(state, {
        id: state.nextId,
        ...action.payload
      });
      state.nextId++;
    },
    chooseCharacter(state, action) {
      state.current = action.payload;
    },
  },
});

export const {
  selectAll: selectAllCharacters,
  selectById: selectCharacterById,
} = charactersAdapter.getSelectors((state: RootState) => state.characters);

export function selectCurrentCharacter(state: RootState) {
  const current = state.characters.current;

  if (current) {
    return selectCharacterById(state, current);
  }
}

export const {
  addCharacter,
  chooseCharacter,
} = characters.actions;

export default characters.reducer;
