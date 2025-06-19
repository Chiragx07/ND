import { Stack } from 'expo-router/stack';

export default function ServicesLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="milk" />
      <Stack.Screen name="water" />
      <Stack.Screen name="fruits" />
      <Stack.Screen name="maid" />
    </Stack>
  );
}