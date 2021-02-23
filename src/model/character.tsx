export const shadowlandsDungeons = [
    "De Other Side",
    "Halls of Atonement",
    "Mists of Tirna Scithe",
    "Plaguefall",
    "Sanguine Depths",
    "Spires of Ascenion",
    "The Necrotic Wake",
    "Theater of Pain",
];

export type Dungeon =
  "De Other Side" |
  "Halls of Atonement" |
  "Mists of Tirna Scithe" |
  "Plaguefall" |
  "Sanguine Depths" |
  "Spires of Ascenion" |
  "The Necrotic Wake" |
  "Theater of Pain";

export interface Character {
  id: number,
  name: string,
  realm: string,
  region: string,
  progress: Progress,
}

export interface Progress {
  mythicPlus: MythicPlus[],
  raid: Raid,
  weeklyAnima: boolean,
  weeklyMawSouls: boolean,
  weeklyVenari: boolean,
  weeklyBonusEvent: boolean,
  worldBoss: boolean,
}

export interface Raid {
  lfr: number,
  normal: number,
  heroic: number,
  mythic: number,
}

export interface MythicPlus {
  dungeon: Dungeon,
  level: number,
}
