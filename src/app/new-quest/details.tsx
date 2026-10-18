import { router } from 'expo-router';
import { ScrollView, StyleSheet, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { OptionCard } from '@/components/option-card';
import { PrimaryButton } from '@/components/primary-button';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { QUEST_DIFFICULTIES } from '@/constants/quest-difficulties';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { useQuestDraft } from '@/hooks/use-quest-draft';
import { useTheme } from '@/hooks/use-theme';

export default function QuestDetailsScreen() {
  const theme = useTheme();
  const { draft, updateDraft } = useQuestDraft();

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView edges={['bottom']} style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <ThemedText>How hard is this quest?</ThemedText>

          {QUEST_DIFFICULTIES.map((option) => (
            <OptionCard
              key={option.value}
              label={option.label}
              hint={option.hint}
              selected={draft.difficulty === option.value}
              onPress={() => updateDraft({ difficulty: option.value })}
            />
          ))}

          <ThemedText style={styles.question}>Notes (optional)</ThemedText>
          <TextInput
            value={draft.notes}
            onChangeText={(notes) => updateDraft({ notes })}
            placeholder="Anything to remember for this quest"
            placeholderTextColor={theme.textSecondary}
            multiline
            style={[styles.notes, { color: theme.text, backgroundColor: theme.backgroundElement }]}
          />
        </ScrollView>

        <PrimaryButton
          label="Next"
          disabled={!draft.difficulty}
          onPress={() => router.push('/new-quest/review')}
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
  content: {
    gap: Spacing.three,
  },
  question: {
    marginTop: Spacing.three,
  },
  notes: {
    fontSize: 16,
    minHeight: 120,
    padding: Spacing.three,
    borderRadius: Spacing.three,
    textAlignVertical: 'top',
  },
});
