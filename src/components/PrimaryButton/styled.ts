import { StyleSheet } from 'react-native';

import { Spacing } from '@/constants/theme';

export const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    paddingVertical: Spacing.three,
    borderRadius: Spacing.three,
  },
  pressed: {
    opacity: 0.8,
  },
  disabled: {
    opacity: 0.4,
  },
});
