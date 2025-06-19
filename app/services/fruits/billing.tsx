import React, { useMemo } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Apple, Carrot, Leaf } from 'lucide-react-native';
import { Colors } from '@/constants/colors';
import { useLocalSearchParams, router } from 'expo-router';

// Vendor-specific items (should match selection.tsx)
const vendorItems: Record<string, { id: string, name: string, unit: string, icon: React.ReactNode, price: number }[]> = {
  '1': [
    { id: '1', name: 'Apple', unit: 'kg', icon: <Apple size={24} color="red" />, price: 120 },
    { id: '2', name: 'Carrot', unit: 'kg', icon: <Carrot size={24} color="orange" />, price: 60 },
    { id: '3', name: 'Spinach', unit: 'bunch', icon: <Leaf size={24} color="green" />, price: 40 },
  ],
  '2': [
    { id: '4', name: 'Banana', unit: 'dozen', icon: <Apple size={24} color="gold" />, price: 50 },
    { id: '5', name: 'Broccoli', unit: 'kg', icon: <Leaf size={24} color="darkgreen" />, price: 90 },
    { id: '6', name: 'Carrot', unit: 'kg', icon: <Carrot size={24} color="orange" />, price: 65 },
  ],
  '3': [
    { id: '7', name: 'Mango', unit: 'kg', icon: <Apple size={24} color="orange" />, price: 150 },
    { id: '8', name: 'Potato', unit: 'kg', icon: <Carrot size={24} color="brown" />, price: 35 },
    { id: '9', name: 'Cabbage', unit: 'piece', icon: <Leaf size={24} color="green" />, price: 30 },
  ],
};

export default function FruitsBillingScreen() {
  const { vendorId, cart } = useLocalSearchParams<{ vendorId: string; cart: string }>();
  const items = useMemo(() => vendorItems[vendorId ?? '1'] ?? [], [vendorId]);
  const cartObj: Record<string, number> = useMemo(() => {
    try {
      return cart ? JSON.parse(cart) : {};
    } catch {
      return {};
    }
  }, [cart]);

  const selectedItems = items.filter(item => cartObj[item.id]);
  const total = selectedItems.reduce(
    (sum, item) => sum + (cartObj[item.id] || 0) * item.price,
    0
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Billing Summary</Text>
      <FlatList
        data={selectedItems}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.left}>{item.icon}</View>
            <View style={styles.middle}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.unit}>
                {cartObj[item.id]} x ₹{item.price} / {item.unit}
              </Text>
            </View>
            <View style={styles.right}>
              <Text style={styles.price}>₹{cartObj[item.id] * item.price}</Text>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <Text style={{ textAlign: 'center', color: Colors.neutral[500], marginTop: 40 }}>
            No items in basket.
          </Text>
        }
      />
      <View style={styles.billContainer}>
        <Text style={styles.billText}>Total: ₹{total}</Text>
      </View>
      <TouchableOpacity
        style={styles.payBtn}
        onPress={() => {
          Alert.alert('Order Placed', 'Your order has been placed successfully!');
          router.replace('/services/fruits'); // Go back to vendor list
        }}
        disabled={selectedItems.length === 0}
      >
        <Text style={styles.payText}>Place Order</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginTop: 20,
    textAlign: 'center',
    marginBottom: 12,
  },
  list: { padding: 16 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.neutral[50],
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  left: { marginRight: 12 },
  middle: { flex: 1 },
  name: { fontSize: 16, fontWeight: '500', marginBottom: 4 },
  unit: { fontSize: 14, color: Colors.neutral[600] },
  right: { alignItems: 'flex-end' },
  price: { fontSize: 16, fontWeight: 'bold', color: Colors.neutral[900] },
  billContainer: {
    alignItems: 'flex-end',
    paddingHorizontal: 24,
    marginBottom: 8,
  },
  billText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.neutral[900],
  },
  payBtn: {
    backgroundColor: Colors.accent[600],
    margin: 16,
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    opacity: 1,
  },
    payText: {
      color: Colors.white,
      fontSize: 16,
      fontWeight: 'bold',
    },
  });