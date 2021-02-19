import {
  Link,
  Links,
  NamedKeyedIdentifier,
} from "./model";

// GET /profile/user/wow
export interface AccountProfileSummary {
  _links: Links,
  collections: Link,
  wow_accounts: WowAccount[],
}

export interface WowAccount {
  characters: Character[],
  id: number,
}

export interface Character {
  character: Link,
  faction: Faction,
  gender: Gender,
  id: number,
  level: number,
  name: string,
  playable_class: NamedKeyedIdentifier,
  playable_race: NamedKeyedIdentifier,
  protected_character: Link,
  realm: Realm,
}

export interface Faction {
  name: string,
  type: "ALLIANCE" | "HORDE",
}

export interface Gender {
  name: string,
  type: "MALE" | "FEMALE",
}

export interface Realm extends NamedKeyedIdentifier {
  slug: string
}
