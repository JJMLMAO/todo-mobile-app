export type QuestType = 'main' | 'side';

/** `xpMultiplier` scales the difficulty's base XP, so a hard main quest pays the most. */
export const QUEST_TYPES: { value: QuestType; label: string; hint: string; xpMultiplier: number }[] = [
  { value: 'main', label: 'Main quest', hint: 'The big thing that matters most', xpMultiplier: 2 },
  { value: 'side', label: 'Side quest', hint: 'Nice to do, not urgent', xpMultiplier: 1 },
];
