import { StyleSheet } from 'react-native';

import { Spacing } from '@/constants/theme';

export const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    padding: Spacing.three,
    borderRadius: Spacing.three,
    borderWidth: 2,
  },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  text: {
    flex: 1,
    gap: Spacing.one,
  },
  pressed: {
    opacity: 0.7,
  },
});
