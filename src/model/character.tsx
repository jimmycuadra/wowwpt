import type { Dungeon } from "./dungeon";
import type { RaidDifficulty } from "./raid";
import type { RegionName } from "./region";

export interface Character {
  id: number,
  name: string,
  realm: string,
  region: RegionName,
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

export type RaidProgress = Record<RaidDifficulty, number>;

export interface MythicPlusRun {
  dungeon: Dungeon,
  level: number,
}
