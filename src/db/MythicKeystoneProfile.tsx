export interface Profile {
  _links: Links,
  current_period: CurrentPeriod,
  seasons: Season[],
  character: Character,
}

export interface Links {
  self: Link,
}

export interface Link {
  href: string,
}

export interface CurrentPeriod {
  period: Period,
  best_runs: BestRunData[],
}

export interface Period {
  key: Link,
  id: number,
}

export interface BestRunData {
  completed_timestamp: number,
  duration: number,
  keystone_level: number,
  keystone_affixes: Affix[],
  members: Member[],
  dungeon: Dungeon,
  is_completed_within_time: boolean,
}

export interface Affix {
  key: Link,
  name: string,
  id: number,
}

export interface Member {
  character: Character,
  specialization: Specialization,
  race: Race,
  equipped_item_level: number,
}

export interface Specialization {
  key: Link,
  name: string,
  id: number
}

export interface Race {
  key: Link,
  name: string,
  id: number,
}

export interface Dungeon {
  key: Link,
  name: string,
  id: number
}

export interface Season {
  key: Link,
  id: number,
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
