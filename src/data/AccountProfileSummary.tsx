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
  character: Link,
  faction: Faction,
  gender: Gender,
  id: number,
  level: number,
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
