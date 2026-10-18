import { DarkTheme, DefaultTheme, ThemeProvider } from 'expo-router';
import { Stack } from 'expo-router/stack';
import { useColorScheme } from 'react-native';

import { QuestDraftProvider } from '@/hooks/use-quest-draft';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <QuestDraftProvider>
        <Stack screenOptions={{ headerBackButtonDisplayMode: 'minimal' }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="new-quest/type" options={{ title: 'Quest type' }} />
          <Stack.Screen name="new-quest/details" options={{ title: 'Details' }} />
          <Stack.Screen name="new-quest/review" options={{ title: 'Review' }} />
        </Stack>
      </QuestDraftProvider>
    </ThemeProvider>
  );
}
