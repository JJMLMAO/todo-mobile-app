import { FlatList, Pressable, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { QUEST_DIFFICULTIES } from "@/constants/quest-difficulties";
import { QUEST_TYPES } from "@/constants/quest-types";
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { questXp, useQuests, type Quest } from "@/hooks/use-quests";

export default function QuestScreen() {
    const { quests } = useQuests();

    return (
        <ThemedView style={styles.container}>
            <SafeAreaView edges={['top', 'left', 'right']} style={styles.safeArea}>
                <FlatList
                    data={quests}
                    keyExtractor={(quest) => quest.id}
                    renderItem={({ item }) => <QuestRow quest={item} />}
                    contentContainerStyle={styles.list}
                    ListHeaderComponent={<ThemedText type="subtitle">Quests</ThemedText>}
                    ListEmptyComponent={
                        <ThemedText themeColor="textSecondary">
                            No quests yet. Start one from the Home tab. Tap a quest to complete it.
                        </ThemedText>
                    }
                />
            </SafeAreaView>
        </ThemedView>
    )
}

function QuestRow({ quest }: { quest: Quest }) {
    const { toggleQuestCompleted } = useQuests();
    const typeLabel = QUEST_TYPES.find((t) => t.value === quest.type)?.label;
    const difficultyLabel = QUEST_DIFFICULTIES.find((d) => d.value === quest.difficulty)?.label;
    const done = quest.completedAt !== undefined;

    return (
        <Pressable
            onPress={() => toggleQuestCompleted(quest.id)}
            accessibilityRole="checkbox"
            accessibilityState={{ checked: done }}
            style={({ pressed }) => pressed && styles.pressed}>
            <ThemedView type="backgroundElement" style={[styles.card, done && styles.done]}>
                <ThemedView type="backgroundElement" style={styles.cardHeader}>
                    <ThemedText type="smallBold" style={[styles.title, done && styles.strike]}>
                        {done ? '✓ ' : ''}{quest.title}
                    </ThemedText>
                    <ThemedText type="small" themeColor="textSecondary">
                        +{questXp(quest)} XP
                    </ThemedText>
                </ThemedView>
                <ThemedText type="small" themeColor="textSecondary">
                    {typeLabel} · {difficultyLabel}
                </ThemedText>
                {quest.notes ? <ThemedText type="small">{quest.notes}</ThemedText> : null}
            </ThemedView>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'row',
    },
    safeArea: {
        flex: 1,
        maxWidth: MaxContentWidth,
    },
    list: {
        gap: Spacing.three,
        paddingHorizontal: Spacing.four,
        paddingTop: Spacing.three,
        paddingBottom: BottomTabInset + Spacing.three,
    },
    card: {
        padding: Spacing.three,
        borderRadius: Spacing.three,
        gap: Spacing.one,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: Spacing.two,
    },
    title: {
        flexShrink: 1,
    },
    done: {
        opacity: 0.6,
    },
    strike: {
        textDecorationLine: 'line-through',
    },
    pressed: {
        opacity: 0.7,
    },
})
