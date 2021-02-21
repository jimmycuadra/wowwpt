export interface Character {
  name: string,
  realm: string,
  region: "us" | "eu",
}

export const regions = {
  us: "NA",
  eu: "EU",
}
