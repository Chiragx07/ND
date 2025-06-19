import { Stack } from 'expo-router/stack';

export default function MaidLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="vendor/[id]" />
      <Stack.Screen name="booking/[vendorId]" />
      <Stack.Screen name="payment" />
    </Stack>
  );
}