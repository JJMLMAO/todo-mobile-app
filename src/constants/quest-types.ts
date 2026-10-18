export type QuestType = 'main' | 'side';

export const QUEST_TYPES: { value: QuestType; label: string; hint: string }[] = [
  { value: 'main', label: 'Main quest', hint: 'The big thing that matters most' },
  { value: 'side', label: 'Side quest', hint: 'Nice to do, not urgent' },
];
