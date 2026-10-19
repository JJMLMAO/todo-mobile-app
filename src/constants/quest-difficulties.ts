export type QuestDifficulty = 'easy' | 'medium' | 'hard';

export const QUEST_DIFFICULTIES: { value: QuestDifficulty; label: string; hint: string; xp: number }[] = [
  { value: 'easy', label: 'Easy', hint: 'Quick win, a few minutes', xp: 50 },
  { value: 'medium', label: 'Medium', hint: 'Takes some focus', xp: 100 },
  { value: 'hard', label: 'Hard', hint: 'A real boss fight', xp: 200 },
];
