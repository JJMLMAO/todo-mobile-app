import Storage from 'expo-sqlite/kv-store';
import { createContext, useContext, useState, type ReactNode } from 'react';

import { QUEST_DIFFICULTIES, type QuestDifficulty } from '@/constants/quest-difficulties';
import { QUEST_TYPES, type QuestType } from '@/constants/quest-types';

export type Quest = {
  id: string;
  title: string;
  type: QuestType;
  difficulty: QuestDifficulty;
  notes: string;
  createdAt: number;
  completedAt?: number;
};

const STORAGE_KEY = 'quests';

// ponytail: whole list stored as one JSON value, move to SQLite tables if it grows to thousands of quests
function loadQuests(): Quest[] {
  const saved = Storage.getItemSync(STORAGE_KEY);
  if (!saved) return [];
  try {
    return JSON.parse(saved) as Quest[];
  } catch {
    console.warn('Saved quests are unreadable, starting with an empty list');
    return [];
  }
}

/** XP a quest pays out when completed: difficulty base XP × quest type multiplier. */
export function questXp(quest: Pick<Quest, 'type' | 'difficulty'>) {
  const base = QUEST_DIFFICULTIES.find((d) => d.value === quest.difficulty)?.xp ?? 0;
  const multiplier = QUEST_TYPES.find((t) => t.value === quest.type)?.xpMultiplier ?? 1;
  return base * multiplier;
}

type QuestsContextValue = {
  quests: Quest[];
  /** Lifetime XP, always derived from completed quests so it can't drift out of sync. */
  totalXp: number;
  addQuest: (quest: Omit<Quest, 'id' | 'createdAt' | 'completedAt'>) => void;
  toggleQuestCompleted: (id: string) => void;
};

const QuestsContext = createContext<QuestsContextValue | null>(null);

/** Loads saved quests once and writes the list back to device storage on every change. */
export function QuestsProvider({ children }: { children: ReactNode }) {
  const [quests, setQuests] = useState(loadQuests);

  function save(next: Quest[]) {
    Storage.setItemSync(STORAGE_KEY, JSON.stringify(next));
    setQuests(next);
  }

  function addQuest(quest: Omit<Quest, 'id' | 'createdAt' | 'completedAt'>) {
    const createdAt = Date.now();
    save([{ ...quest, id: `${createdAt}-${Math.random().toString(36).slice(2)}`, createdAt }, ...quests]);
  }

  function toggleQuestCompleted(id: string) {
    save(
      quests.map((quest) =>
        quest.id === id ? { ...quest, completedAt: quest.completedAt ? undefined : Date.now() } : quest
      )
    );
  }

  const totalXp = quests.reduce((sum, quest) => (quest.completedAt ? sum + questXp(quest) : sum), 0);

  return (
    <QuestsContext.Provider value={{ quests, totalXp, addQuest, toggleQuestCompleted }}>
      {children}
    </QuestsContext.Provider>
  );
}

export function useQuests() {
  const context = useContext(QuestsContext);
  if (!context) throw new Error('useQuests must be used inside QuestsProvider');
  return context;
}
