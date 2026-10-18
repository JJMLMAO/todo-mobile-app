export type QuestDifficulty = 'easy' | 'medium' | 'hard';

export const QUEST_DIFFICULTIES: { value: QuestDifficulty; label: string; hint: string }[] = [
  { value: 'easy', label: 'Easy', hint: 'Quick win, a few minutes' },
  { value: 'medium', label: 'Medium', hint: 'Takes some focus' },
  { value: 'hard', label: 'Hard', hint: 'A real boss fight' },
];
