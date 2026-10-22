import { Pressable, View } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { useTheme } from '@/hooks/useTheme';

import { styles } from './styled';
import type { PrimaryButtonProps } from './types';

export function PrimaryButton({ label, onPress, disabled, style }: PrimaryButtonProps) {
  const theme = useTheme();

  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      style={({ pressed }) => [style, pressed && styles.pressed, disabled && styles.disabled]}>
      <View style={[styles.button, { backgroundColor: theme.accent }]}>
        <ThemedText type="smallBold" themeColor="onAccent">
          {label}
        </ThemedText>
      </View>
    </Pressable>
  );
}
