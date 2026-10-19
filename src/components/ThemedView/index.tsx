import { View } from 'react-native';

import { useTheme } from '@/hooks/useTheme';

import type { ThemedViewProps } from './types';

export type { ThemedViewProps };

export function ThemedView({ style, lightColor, darkColor, type, ...otherProps }: ThemedViewProps) {
  const theme = useTheme();

  return <View style={[{ backgroundColor: theme[type ?? 'background'] }, style]} {...otherProps} />;
}
