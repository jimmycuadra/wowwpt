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
  mythicPlus: MythicPlusRun[],
  raid: RaidProgress,
  weeklyAnima: boolean,
  weeklyMawSouls: boolean,
  weeklyVenari: boolean,
  weeklyBonusEvent: boolean,
  worldBoss: boolean,
}

export type RaidDifficulty = "lfr" | "normal" | "heroic" | "mythic";

export type RaidProgress = Record<RaidDifficulty, number>;

export interface MythicPlusRun {
  dungeon: Dungeon,
  level: number,
}
