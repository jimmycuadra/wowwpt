// The "_links" key in many API responses.
export interface Links {
  self: Link,
  profile?: Link,
  user?: Link,
}

// An object that simply contains a URL under an "href" key.
export interface Link {
  href: string,
}

// Any object with a numeric ID.
export interface Identifier {
  id: number,
}

// Any object with a human-readable name.
export interface Name {
  name: string,
}

// Any object with a `Link` under a key called "key".
export interface KeyLink {
  key: Link,
}

export type KeyedIdentifier = Identifier & KeyLink;
export type NamedKeyedIdentifier = Identifier & Name & KeyLink;
