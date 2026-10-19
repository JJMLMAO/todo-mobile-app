import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { useQuests } from '@/hooks/use-quests';
import { useTheme } from '@/hooks/use-theme';
import { getLevelProgress } from '@/utils/level';

// ponytail: placeholder until there's a way to set your name
const PLAYER_NAME = 'Adventurer';

export default function ProfileScreen() {
  const theme = useTheme();
  const { quests, totalXp } = useQuests();
  const { level, xpIntoLevel, xpForLevel } = getLevelProgress(totalXp);
  const completed = quests.filter((quest) => quest.completedAt !== undefined).length;

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView edges={['top', 'left', 'right']} style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.content}>
          <ThemedText type="subtitle">{PLAYER_NAME}</ThemedText>

          <ThemedView type="backgroundElement" style={styles.card}>
            <ThemedView type="backgroundElement" style={styles.levelRow}>
              <ThemedText type="smallBold">Level {level}</ThemedText>
              <ThemedText type="small" themeColor="textSecondary">
                {xpIntoLevel} / {xpForLevel} XP
              </ThemedText>
            </ThemedView>

            <View
              accessibilityRole="progressbar"
              accessibilityValue={{ min: 0, max: xpForLevel, now: xpIntoLevel }}
              style={[styles.barTrack, { backgroundColor: theme.backgroundSelected }]}>
              <View
                style={[
                  styles.barFill,
                  { backgroundColor: theme.accent, width: `${(xpIntoLevel / xpForLevel) * 100}%` },
                ]}
              />
            </View>

            <ThemedText type="small" themeColor="textSecondary">
              {totalXp} XP earned in total
            </ThemedText>
          </ThemedView>

          <ThemedView style={styles.stats}>
            <Stat label="Completed" value={completed} />
            <Stat label="Not completed" value={quests.length - completed} />
          </ThemedView>
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <ThemedView type="backgroundElement" style={[styles.card, styles.stat]}>
      <ThemedText type="subtitle">{value}</ThemedText>
      <ThemedText type="small" themeColor="textSecondary">
        {label}
      </ThemedText>
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
    maxWidth: MaxContentWidth,
  },
  content: {
    gap: Spacing.three,
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.three,
    paddingBottom: BottomTabInset + Spacing.three,
  },
  card: {
    padding: Spacing.three,
    borderRadius: Spacing.three,
    gap: Spacing.two,
  },
  levelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  barTrack: {
    height: 12,
    borderRadius: 6,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 6,
  },
  stats: {
    flexDirection: 'row',
    gap: Spacing.three,
  },
  stat: {
    flex: 1,
    alignItems: 'center',
  },
});
