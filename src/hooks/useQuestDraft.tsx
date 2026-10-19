import { createContext, useContext, useState, type ReactNode } from 'react';

import type { QuestDifficulty } from '@/constants/quest-difficulties';
import type { QuestType } from '@/constants/quest-types';

export type QuestDraft = {
  title: string;
  type?: QuestType;
  difficulty?: QuestDifficulty;
  notes: string;
};

const EMPTY_DRAFT: QuestDraft = { title: '', notes: '' };

type QuestDraftContextValue = {
  draft: QuestDraft;
  updateDraft: (patch: Partial<QuestDraft>) => void;
  resetDraft: () => void;
};

const QuestDraftContext = createContext<QuestDraftContextValue | null>(null);

/** Holds the quest being created while the user moves through the new-quest steps. */
export function QuestDraftProvider({ children }: { children: ReactNode }) {
  const [draft, setDraft] = useState(EMPTY_DRAFT);

  return (
    <QuestDraftContext.Provider
      value={{
        draft,
        updateDraft: (patch) => setDraft((current) => ({ ...current, ...patch })),
        resetDraft: () => setDraft(EMPTY_DRAFT),
      }}>
      {children}
    </QuestDraftContext.Provider>
  );
}

export function useQuestDraft() {
  const context = useContext(QuestDraftContext);
  if (!context) throw new Error('useQuestDraft must be used inside QuestDraftProvider');
  return context;
}
