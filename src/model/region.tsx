export interface Region {
  short: string,
  long: string,
}

export const regions: { [key: string]: Region } = {
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
}
