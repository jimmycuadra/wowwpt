import { RaidDifficulty } from "./raid";

export const REWARDS: Rewards = {
  raidPriorities: ["mythic", "heroic", "normal", "lfr"],
  raid: {
    lfr: {
      min: 187,
      max: 194,
    },
    normal: {
      min: 200,
      max: 207,
    },
    heroic: {
      min: 213,
      max: 220,
    },
    mythic: {
      min: 226,
      max: 233,
    },
  },
  mythicPlusItemLevelForKeyLevel: (keyLevel) => {
    if (keyLevel < 2) {
      throw Error("Keystone level must be at least 2.");
    }

    switch (keyLevel) {
      case 2:
        return 200;
      case 3:
        return 203;
      case 4:
        return 207;
      case 5:
      case 6:
        return 210;
      case 7:
        return 213;
      case 8:
      case 9:
        return 216;
      case 10:
      case 11:
        return 220;
      case 12:
      case 13:
        return 223;
      default:
        return 226;
    }
  },
};

interface Rewards {
  raidPriorities: RaidDifficulty[],
  raid: RaidRewards,
  mythicPlusItemLevelForKeyLevel: (keyLevel: number) => number,
}

type RaidRewards = Record<RaidDifficulty, RaidRewardMinMax>;

interface RaidRewardMinMax {
  min: number,
  max: number,
}
