import { RaidDifficulty } from "./raid";

export const REWARDS: Rewards = {
  priorities: ["mythic", "heroic", "normal", "lfr"],
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
  mythicPlus: {
    2: 200,
    3: 203,
    4: 207,
    5: 210,
    6: 210,
    7: 213,
    8: 216,
    9: 216,
    10: 220,
    11: 220,
    12: 223,
    13: 223,
    14: 226,
    15: 226,
    maxKeyLevel: 15,
    maxItemLevel: 226,
  }
}

interface Rewards {
  priorities: RaidDifficulty[],
  raid: RaidRewards,
  mythicPlus: MythicPlusRewards,
}

type RaidRewards = Record<RaidDifficulty, RaidRewardMinMax>;

interface RaidRewardMinMax {
  min: number,
  max: number,
}

interface MythicPlusRewards {
  [key: number]: number,
  maxKeyLevel: number,
  maxItemLevel: number,
}
