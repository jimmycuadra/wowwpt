import { Character } from "../db/MythicKeystoneProfile";

export function formatCharacterName(character: Character) {
  return `${character.name} - ${character.realm.slug.replace(/^\w/, (c) => c.toUpperCase())}`;
}

export function formatDuration(ms: number) {
  const h = Math.floor(ms / 1000 / 60 / 60);
  const m = Math.floor((ms / 1000 / 60 / 60 - h) * 60);
  const s = Math.floor(((ms / 1000 / 60 / 60 - h) * 60 - m) * 60);

  if (h > 0) {
    return `${h}h ${m}m ${s}s`;
  } else if (m > 0) {
    return `${m}m ${s}s`;
  } else {
    return `${s}s`
  }
}
