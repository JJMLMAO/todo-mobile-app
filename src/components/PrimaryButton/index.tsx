import { Pressable } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

import { styles } from './styled';
import type { PrimaryButtonProps } from './types';

export function PrimaryButton({ label, onPress, disabled, style }: PrimaryButtonProps) {
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [style, pressed && styles.pressed, disabled && styles.disabled]}>
      <ThemedView type="backgroundSelected" style={styles.button}>
        <ThemedText type="smallBold">{label}</ThemedText>
      </ThemedView>
    </Pressable>
  );
}
