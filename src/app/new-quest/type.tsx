import { router } from 'expo-router';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { OptionCard } from '@/components/OptionCard';
import { PrimaryButton } from '@/components/PrimaryButton';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { QUEST_TYPES } from '@/constants/quest-types';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { useQuestDraft } from '@/hooks/useQuestDraft';

export default function QuestTypeScreen() {
  const { draft, updateDraft } = useQuestDraft();

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView edges={['bottom']} style={styles.safeArea}>
        <ThemedText type="small" themeColor="textSecondary">
          Your quest
        </ThemedText>
        <ThemedText type="subtitle">{draft.title}</ThemedText>

        <ThemedText style={styles.question}>What type of quest is this?</ThemedText>

        {QUEST_TYPES.map((option) => (
          <OptionCard
            key={option.value}
            label={option.label}
            hint={option.hint}
            selected={draft.type === option.value}
            onPress={() => updateDraft({ type: option.value })}
          />
        ))}

        <PrimaryButton
          label="Next"
          disabled={!draft.type}
          onPress={() => router.push('/new-quest/details')}
          style={styles.next}
        />
      </SafeAreaView>
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
  question: {
    marginTop: Spacing.four,
  },
  next: {
    marginTop: 'auto',
  },
});
