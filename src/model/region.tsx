export interface Region {
  short: string,
  long: string,
}

export const REGION_NAMES = ["us", "eu", "kr", "tw", "cn"] as const;
export type RegionName = typeof REGION_NAMES[number];

export const regions: Record<RegionName, Region> = {
  us: {
    short: "NA",
    long: "North America",
  },
  eu: {
    short: "EU",
    long: "Europe",
  },
  kr: {
    short: "KR",
    long: "Korea",
  },
  tw: {
    short: "TW",
    long: "Korea",
  },
  cn: {
    short: "CN",
    long: "China",
  },
};
