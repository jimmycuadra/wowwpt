export interface Profile {
  _links: Links,
  current_period: CurrentPeriod,
  seasons: Array<Identifier & KeyLink>,
  character: Character,
}

export interface Links {
  self: Link,
}

export interface Link {
  href: string,
}

export interface CurrentPeriod {
  period: Identifier & KeyLink,
  best_runs: BestRunData[],
}

export interface BestRunData {
  completed_timestamp: number,
  duration: number,
  keystone_level: number,
  keystone_affixes: Array<Identifier & Name & KeyLink>,
  members: Member[],
  dungeon: Identifier & Name & KeyLink,
  is_completed_within_time: boolean,
}

export interface Member {
  character: Character,
  specialization: Identifier & Name & KeyLink,
  race: Identifier & Name & KeyLink,
  equipped_item_level: number,
}

export interface Character {
  key?: Link,
  name: string,
  id: number,
  realm: Realm,
}

export interface Realm {
  key: Link,
  id: number,
  slug: string,
}

export interface Identifier {
  id: number,
}

export interface Name {
  name: string,
}

export interface KeyLink {
  key: Link,
}
