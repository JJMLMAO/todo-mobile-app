import { Pressable } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

import { styles } from './styled';
import type { OptionCardProps } from './types';

export function OptionCard({ label, hint, selected, onPress }: OptionCardProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="radio"
      accessibilityState={{ selected }}
      style={({ pressed }) => pressed && styles.pressed}>
      <ThemedView type={selected ? 'backgroundSelected' : 'backgroundElement'} style={styles.card}>
        <ThemedText type="smallBold">{label}</ThemedText>
        <ThemedText type="small" themeColor="textSecondary">
          {hint}
        </ThemedText>
      </ThemedView>
    </Pressable>
  );
}
