import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, FlatList } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/colors';
import { Circle, CheckCircle2 } from 'lucide-react-native';

const paymentMethods = [
  { id: 'upi', name: 'UPI' },
  { id: 'card', name: 'Credit/Debit Card' },
  { id: 'cash', name: 'Cash on Delivery' },
];

export default function MaidPaymentScreen() {
  const { vendorId, start, end, days, total } = useLocalSearchParams<{
    vendorId: string;
    start: string;
    end: string;
    days: string;
    total: string;
  }>();

  const [selectedMethod, setSelectedMethod] = useState('upi');

  const handlePayment = () => {
    if (!selectedMethod) {
      Alert.alert('Please select a payment method');
      return;
    }

    Alert.alert('Payment Successful', `Paid ₹${total} via ${selectedMethod.toUpperCase()}`, [
      { text: 'OK', onPress: () => router.replace('/') },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Choose Payment Method</Text>

      <FlatList
        data={paymentMethods}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingHorizontal: 20 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.methodItem}
            onPress={() => setSelectedMethod(item.id)}
            activeOpacity={0.8}
          >
            {selectedMethod === item.id ? (
              <CheckCircle2 size={20} color={Colors.success[600]} />
            ) : (
              <Circle size={20} color={Colors.neutral[400]} />
            )}
            <Text style={styles.methodText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />

      <View style={styles.footer}>
        <View>
          <Text style={styles.totalLabel}>Total Amount</Text>
          <Text style={styles.totalAmount}>₹{total}</Text>
        </View>
        <TouchableOpacity style={styles.payButton} onPress={handlePayment}>
          <Text style={styles.payButtonText}>Pay Now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.neutral[50],
    paddingTop: 20,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: Colors.neutral[900],
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  methodItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 12,
    elevation: 1,
    gap: 10,
  },
  methodText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: Colors.neutral[800],
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderColor: Colors.neutral[200],
    backgroundColor: Colors.white,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 20,
  },
  totalLabel: {
    fontSize: 14,
    color: Colors.neutral[500],
    fontFamily: 'Inter-Regular',
  },
  totalAmount: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: Colors.neutral[900],
  },
  payButton: {
    backgroundColor: Colors.success[600],
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignSelf: 'center',
  },
  payButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
});

