import type { StyleProp, ViewStyle } from 'react-native';

export type PrimaryButtonProps = {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
};
