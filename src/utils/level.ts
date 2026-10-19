/** XP needed to go from `level` to `level + 1`: 1000 for level 1, 2000 for level 2, and so on. */
export function xpToNextLevel(level: number) {
  return 1000 * level;
}

/** Turns lifetime XP into the current level and how far the bar is filled. */
export function getLevelProgress(totalXp: number) {
  let level = 1;
  let xpIntoLevel = Math.max(0, totalXp);
  while (xpIntoLevel >= xpToNextLevel(level)) {
    xpIntoLevel -= xpToNextLevel(level);
    level += 1;
  }
  return { level, xpIntoLevel, xpForLevel: xpToNextLevel(level) };
}
