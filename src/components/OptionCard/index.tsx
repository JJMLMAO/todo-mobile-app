import { Pressable, View } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { useTheme } from '@/hooks/useTheme';

import { styles } from './styled';
import type { OptionCardProps } from './types';

export function OptionCard({ label, hint, selected, onPress, badge }: OptionCardProps) {
  const theme = useTheme();

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="radio"
      accessibilityState={{ checked: selected }}
      style={({ pressed }) => pressed && styles.pressed}>
      <View
        style={[
          styles.card,
          {
            backgroundColor: theme.backgroundElement,
            borderColor: selected ? theme.accent : 'transparent',
          },
        ]}>
        <View style={[styles.radio, { borderColor: selected ? theme.accent : theme.textSecondary }]}>
          {selected && <View style={[styles.radioDot, { backgroundColor: theme.accent }]} />}
        </View>

        <View style={styles.text}>
          <ThemedText type="smallBold">{label}</ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            {hint}
          </ThemedText>
        </View>

        {badge && (
          <ThemedText type="smallBold" themeColor={selected ? 'accent' : 'textSecondary'}>
            {badge}
          </ThemedText>
        )}
      </View>
    </Pressable>
  );
}
