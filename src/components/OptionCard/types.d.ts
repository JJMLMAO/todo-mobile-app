export type OptionCardProps = {
  label: string;
  hint: string;
  selected: boolean;
  onPress: () => void;
  /** Short text shown on the right, e.g. "+100 XP". */
  badge?: string;
};
