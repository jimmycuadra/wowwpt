export const regions = {
  us: "NA",
  eu: "EU",
  kr: "KR",
  tw: "TW",
  cn: "CN",
}

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

export interface Character {
  id: number,
  name: string,
  realm: string,
  region: "us" | "eu",
  progress: Progress,
}

export interface Progress {
  mythicPlus: MythicPlus[],
  raid: Raid,
  weeklyAnima: boolean,
  weeklyMawSouls: boolean,
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
  dungeon:
    "De Other Side" |
    "Halls of Atonement" |
    "Mists of Tirna Scithe" |
    "Plaguefall" |
    "Sanguine Depths" |
    "Spires of Ascenion" |
    "The Necrotic Wake" |
    "Theater of Pain",
  level: number,
}
