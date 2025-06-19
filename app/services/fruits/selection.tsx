import React, { useState, useMemo, ReactElement } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Apple, Carrot, Leaf } from 'lucide-react-native';
import { Colors } from '@/constants/colors';
import { useLocalSearchParams, router } from 'expo-router';

// Vendor-specific items
const vendorItems: Record<string, { id: string, name: string, unit: string, icon: ReactElement, price: number }[]> = {
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

export default function FruitsSelectionScreen() {
  const { vendorId } = useLocalSearchParams<{ vendorId: string }>();
  const items = useMemo(() => vendorItems[vendorId ?? '1'] ?? [], [vendorId]);
  const [cart, setCart] = useState<Record<string, number>>({});

  const increment = (id: string) => {
    setCart(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const decrement = (id: string) => {
    setCart(prev => {
      const qty = (prev[id] || 0) - 1;
      if (qty <= 0) {
        const newCart = { ...prev };
        delete newCart[id];
        return newCart;
      }
      return { ...prev, [id]: qty };
    });
  };

  // Calculate total price
  const total = items.reduce((sum, item) => sum + (cart[item.id] || 0) * item.price, 0);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Choose Your Items</Text>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.left}>{item.icon}</View>
            <View style={styles.middle}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.unit}>Unit: {item.unit} | ₹{item.price}/{item.unit}</Text>
            </View>
            <View style={styles.right}>
              <TouchableOpacity onPress={() => decrement(item.id)} style={styles.qtyBtn}>
                <Text style={styles.qtyText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.qty}>{cart[item.id] || 0}</Text>
              <TouchableOpacity onPress={() => increment(item.id)} style={styles.qtyBtn}>
                <Text style={styles.qtyText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      <View style={styles.billContainer}>
        <Text style={styles.billText}>Total: ₹{total}</Text>
      </View>
      <TouchableOpacity
        style={[styles.checkoutBtn, { opacity: Object.keys(cart).length === 0 ? 0.5 : 1 }]}
        onPress={() => {
          if (Object.keys(cart).length > 0) {
            router.push({ pathname: '/services/fruits/billing', params: { vendorId, cart: JSON.stringify(cart) } });
          }
        }}
        disabled={Object.keys(cart).length === 0}
      >
        <Text style={styles.checkoutText}>
          {Object.keys(cart).length === 0 ? 'Add items to basket' : 'Proceed to Billing'}
        </Text>
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
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  qty: {
    fontSize: 16,
    fontWeight: '500',
    minWidth: 24,
    textAlign: 'center',
  },
  qtyBtn: {
    width: 30,
    height: 30,
    borderRadius: 6,
    backgroundColor: Colors.accent[100],
    justifyContent: 'center',
    alignItems: 'center',
  },
  qtyText: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.accent[600],
  },
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
  checkoutBtn: {
    backgroundColor: Colors.accent[600],
    margin: 16,
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  checkoutText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});