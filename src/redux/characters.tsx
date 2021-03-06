import { EntityState, PayloadAction, createEntityAdapter, createSlice } from "@reduxjs/toolkit";

import { RootState } from "./store";
import { Character, MythicPlusRun, Progress } from "../model/character";

const charactersAdapter = createEntityAdapter<Character>();

interface CharactersExtraState {
  current: number | null,
  nextId: number,
}

type CharactersState = EntityState<Character> & CharactersExtraState;

const initialAdapterState: CharactersExtraState = {
  current: null,
  nextId: 1,
};

const initialState = charactersAdapter.getInitialState(initialAdapterState);

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
          weeklyVenari: false,
          weeklyBonusEvent: false,
          worldBoss: false,
        },
        ...action.payload
      });

      state.nextId++;

      state.current = id;
    },
    addMythicPlusDungeonRun(state, action: PayloadAction<MythicPlusRun>) {
      const progress = getProgress(state);

      if (progress) {
        progress.mythicPlus.push(action.payload);
      }
    },
    chooseCharacter(state, action: PayloadAction<number>) {
      state.current = action.payload;
    },
    deleteAllData(state) {
      charactersAdapter.removeAll(state);
      state.current = null;
      state.nextId = 1;
    },
    deleteMythicPlusDungeonRun(state, action: PayloadAction<number>) {
      const progress = getProgress(state);

      if (progress) {
        progress.mythicPlus.splice(action.payload, 1);
      }
    },
    resetAllCharacters(state) {
      Object.values(state.entities).forEach((character) => {
        if (character) {
          resetProgress(character.progress)
        }
      });
    },
    resetCurrentCharacter(state) {
      const progress = getProgress(state);

      if (progress) {
        resetProgress(progress);
      }
    },
    setRaidLFR(state, action: PayloadAction<number>) {
      const progress = getProgress(state);

      if (progress) {
        progress.raid.lfr = action.payload;
      }
    },
    setRaidNormal(state, action: PayloadAction<number>) {
      const progress = getProgress(state);

      if (progress) {
        progress.raid.normal = action.payload;
      }
    },
    setRaidHeroic(state, action: PayloadAction<number>) {
      const progress = getProgress(state);

      if (progress) {
        progress.raid.heroic = action.payload;
      }
    },
    setRaidMythic(state, action: PayloadAction<number>) {
      const progress = getProgress(state);

      if (progress) {
        progress.raid.mythic = action.payload;
      }
    },
    toggleWeeklyAnima(state) {
      const progress = getProgress(state);

      if (progress) {
        progress.weeklyAnima = !progress.weeklyAnima;
      }
    },
    toggleWeeklyVenari(state) {
      const progress = getProgress(state);

      if (progress) {
        progress.weeklyVenari = !progress.weeklyVenari;
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

function resetProgress(progress: Progress) {
  progress.mythicPlus = [];
  progress.raid = {
    lfr: 0,
    normal: 0,
    heroic: 0,
    mythic: 0,
  };
  progress.weeklyAnima = false;
  progress.weeklyMawSouls = false;
  progress.weeklyVenari = false;
  progress.weeklyBonusEvent = false;
  progress.worldBoss = false;
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
  addMythicPlusDungeonRun,
  chooseCharacter,
  deleteAllData,
  deleteMythicPlusDungeonRun,
  resetAllCharacters,
  resetCurrentCharacter: resetCharacter,
  setRaidLFR,
  setRaidNormal,
  setRaidHeroic,
  setRaidMythic,
  toggleWeeklyAnima,
  toggleWeeklyMawSouls,
  toggleWeeklyVenari,
  toggleWeeklyBonusEvent,
  toggleWorldBoss,
} = characters.actions;

export default characters.reducer;
