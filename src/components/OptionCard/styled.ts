import { StyleSheet } from 'react-native';

import { Spacing } from '@/constants/theme';

export const styles = StyleSheet.create({
  card: {
    padding: Spacing.three,
    borderRadius: Spacing.three,
    gap: Spacing.one,
  },
  pressed: {
    opacity: 0.7,
  },
});
