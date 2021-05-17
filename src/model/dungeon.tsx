export const SHADOWLANDS_DUNGEONS = [
    "De Other Side",
    "Halls of Atonement",
    "Mists of Tirna Scithe",
    "Plaguefall",
    "Sanguine Depths",
    "Spires of Ascenion",
    "The Necrotic Wake",
    "Theater of Pain",
] as const;

export type Dungeon = typeof SHADOWLANDS_DUNGEONS[number];
