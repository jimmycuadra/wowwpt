import { EntityState, createEntityAdapter, createSlice } from "@reduxjs/toolkit";

import { RootState } from "./store";
import { Character } from "../model/character";

const charactersAdapter = createEntityAdapter<Character>();

interface CharactersState extends EntityState<Character> {
  current: number | null,
  nextId: number,
}

const initialState = charactersAdapter.getInitialState({
  current: null,
  nextId: 1,
} as CharactersState);

const characters = createSlice({
  name: "characters",
  initialState,
  reducers: {
    addCharacter(state, action) {
      const id = state.nextId;

      charactersAdapter.addOne(state, {
        id,
        progress: {
          mythicPlus: [],
          raid: {
            lfr: 0,
            normal: 0,
            heroic: 0,
            mythic: 0,
          },
          weeklyAnima: false,
          weeklyMawSouls: false,
          weeklyBonusEvent: false,
          worldBoss: false,
        },
        ...action.payload
      });

      state.nextId++;

      if (!state.current)  {
        state.current = id;
      }
    },
    chooseCharacter(state, action) {
      state.current = action.payload;
    },
    toggleWeeklyAnima(state) {
      const progress = getProgress(state);

      if (progress) {
        progress.weeklyAnima = !progress.weeklyAnima;
      }
    },
    toggleWeeklyMawSouls(state) {
      const progress = getProgress(state);

      if (progress) {
        progress.weeklyMawSouls = !progress.weeklyMawSouls;
      }
    },
    toggleWeeklyBonusEvent(state) {
      const progress = getProgress(state);

      if (progress) {
        progress.weeklyBonusEvent = !progress.weeklyBonusEvent;
      }
    },
    toggleWorldBoss(state) {
      const progress = getProgress(state);

      if (progress) {
        progress.worldBoss = !progress.worldBoss;
      }
    }
  },
});

function getProgress(state: CharactersState) {
  const current = state.current;

  if (current) {
    const character = state.entities[current];

    if (character) {
      return character.progress;
    }
  }
}

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

export function selectProgress(state: RootState) {
  const current = selectCurrentCharacter(state);

  if (current) {
    return current.progress;
  }
}

export const {
  addCharacter,
  chooseCharacter,
  toggleWeeklyAnima,
  toggleWeeklyMawSouls,
  toggleWeeklyBonusEvent,
  toggleWorldBoss,
} = characters.actions;

export default characters.reducer;
