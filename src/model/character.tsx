export const SHADOWLANDS_DUNGEONS = [
    "De Other Side",
    "Halls of Atonement",
    "Mists of Tirna Scithe",
    "Plaguefall",
    "Sanguine Depths",
    "Spires of Ascenion",
    "The Necrotic Wake",
    "Theater of Pain",
] as const;

export type Dungeon = typeof SHADOWLANDS_DUNGEONS[number];

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

export type RaidDifficulty = keyof Raid;

export interface MythicPlus {
  dungeon: Dungeon,
  level: number,
}
