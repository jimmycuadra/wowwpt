import {
  Link,
  Links,
  KeyedIdentifier,
  NamedKeyedIdentifier,
} from "./model";

// GET /profile/wow/character/{realmSlug}/{characterName}/mythic-keystone-profile
export interface CharacterMythicKeystoneProfileIndex {
  _links: Links,
  current_period: CurrentPeriod,
  seasons: KeyedIdentifier[],
  character: Character,
}

export interface CurrentPeriod {
  period: KeyedIdentifier,
  best_runs: BestRunData[],
}

export interface BestRunData {
  completed_timestamp: number,
  duration: number,
  keystone_level: number,
  keystone_affixes: NamedKeyedIdentifier[],
  members: Member[],
  dungeon: NamedKeyedIdentifier,
  is_completed_within_time: boolean,
}

export interface Member {
  character: Character,
  specialization: NamedKeyedIdentifier,
  race: NamedKeyedIdentifier,
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
