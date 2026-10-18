import { router } from 'expo-router';
import { StyleSheet, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PrimaryButton } from '@/components/primary-button';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { useQuestDraft } from '@/hooks/use-quest-draft';
import { useTheme } from '@/hooks/use-theme';

export default function HomeScreen() {
  const theme = useTheme();
  const { draft, updateDraft } = useQuestDraft();
  const canContinue = draft.title.trim().length > 0;

  function goNext() {
    updateDraft({ title: draft.title.trim() });
    router.push('/new-quest/type');
  }

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ThemedText type="subtitle">What do you want to do?</ThemedText>

        <TextInput
          value={draft.title}
          onChangeText={(title) => updateDraft({ title })}
          placeholder="e.g. Clean my room"
          placeholderTextColor={theme.textSecondary}
          returnKeyType="next"
          onSubmitEditing={() => canContinue && goNext()}
          style={[styles.input, { color: theme.text, backgroundColor: theme.backgroundElement }]}
        />

        <PrimaryButton label="Next" disabled={!canContinue} onPress={goNext} />
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
    justifyContent: 'center',
    paddingHorizontal: Spacing.four,
    paddingBottom: BottomTabInset + Spacing.three,
    gap: Spacing.three,
    maxWidth: MaxContentWidth,
  },
  input: {
    fontSize: 16,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.three,
    borderRadius: Spacing.three,
  },
});
