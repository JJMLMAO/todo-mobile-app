import { router } from 'expo-router';
import { Keyboard, Pressable, StyleSheet, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { PrimaryButton } from '@/components/PrimaryButton';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { useQuestDraft } from '@/hooks/useQuestDraft';
import { useTheme } from '@/hooks/useTheme';

export default function HomeScreen() {
  const theme = useTheme();
  const { draft, updateDraft } = useQuestDraft();
  const canContinue = draft.title.trim().length > 0;

  function goNext() {
    updateDraft({ title: draft.title.trim() });
    router.push('/new-quest/type');
  }

  return (
    // Tapping anywhere outside the input closes the keyboard; accessible={false} keeps screen readers on the real controls
    <Pressable onPress={Keyboard.dismiss} accessible={false} style={styles.dismissArea}>
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
    </Pressable>
  );
}

const styles = StyleSheet.create({
  dismissArea: {
    flex: 1,
  },
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
