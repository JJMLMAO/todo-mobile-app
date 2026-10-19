import { router } from 'expo-router';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PrimaryButton } from '@/components/primary-button';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { QUEST_DIFFICULTIES } from '@/constants/quest-difficulties';
import { QUEST_TYPES } from '@/constants/quest-types';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { useQuestDraft } from '@/hooks/use-quest-draft';
import { useQuests } from '@/hooks/use-quests';

export default function QuestReviewScreen() {
  const { draft, resetDraft } = useQuestDraft();
  const { addQuest } = useQuests();
  const typeLabel = QUEST_TYPES.find((t) => t.value === draft.type)?.label;
  const difficultyLabel = QUEST_DIFFICULTIES.find((d) => d.value === draft.difficulty)?.label;
  const { title, type, difficulty } = draft;
  const isComplete = title.length > 0 && type !== undefined && difficulty !== undefined;

  function createQuest() {
    if (!isComplete) return;
    addQuest({ title, type, difficulty, notes: draft.notes.trim() });
    resetDraft();
    router.dismissAll();
    router.navigate('/quest');
  }

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView edges={['bottom']} style={styles.safeArea}>
        <ThemedView type="backgroundElement" style={styles.card}>
          <Row label="Quest" value={draft.title} />
          <Row label="Type" value={typeLabel} />
          <Row label="Difficulty" value={difficultyLabel} />
          <Row label="Notes" value={draft.notes.trim() || '—'} />
        </ThemedView>

        <PrimaryButton
          label="Create quest"
          disabled={!isComplete}
          onPress={createQuest}
          style={styles.create}
        />
      </SafeAreaView>
    </ThemedView>
  );
}

function Row({ label, value }: { label: string; value?: string }) {
  return (
    <ThemedView type="backgroundElement" style={styles.row}>
      <ThemedText type="small" themeColor="textSecondary">
        {label}
      </ThemedText>
      <ThemedText>{value}</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  safeArea: {
    flex: 1,
    padding: Spacing.four,
    gap: Spacing.three,
    maxWidth: MaxContentWidth,
  },
  card: {
    padding: Spacing.three,
    borderRadius: Spacing.three,
    gap: Spacing.three,
  },
  row: {
    gap: Spacing.half,
  },
  create: {
    marginTop: 'auto',
  },
});
