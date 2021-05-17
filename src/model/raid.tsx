export const RAID_DIFFICULTIES = ["lfr", "normal", "heroic", "mythic"] as const;

export type RaidDifficulty = typeof RAID_DIFFICULTIES[number];

export const RAID_DIFFICULTY_NAMES: Record<RaidDifficulty, string> = {
  lfr: "LFR",
  normal: "Normal",
  heroic: "Heroic",
  mythic: "Mythic",
};
