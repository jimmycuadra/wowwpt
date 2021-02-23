export interface Character {
  id: number,
  name: string,
  realm: string,
  region: "us" | "eu",
}

export const regions = {
  us: "NA",
  eu: "EU",
  kr: "KR",
  tw: "TW",
  cn: "CN",
}
