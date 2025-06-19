import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import { Colors } from '@/constants/colors';

export default function MaidPaymentScreen() {
  const { vendorId, start, end, days, total } = useLocalSearchParams<{
    vendorId: string;
    start: string;
    end: string;
    days: string;
    total: string;
  }>();

  const handlePay = () => {
    Alert.alert('Payment Successful', 'Your maid booking is confirmed!');
    router.replace('/services/maid');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Payment</Text>
      <View style={styles.summary}>
        <Text style={styles.label}>Booking Dates:</Text>
        <Text style={styles.value}>
          {start ? new Date(start).toDateString() : ''} - {end ? new Date(end).toDateString() : ''}
        </Text>
        <Text style={styles.label}>Total Days:</Text>
        <Text style={styles.value}>{days}</Text>
        <Text style={styles.label}>Total Amount:</Text>
        <Text style={styles.total}>₹{total}</Text>
      </View>
      <TouchableOpacity style={styles.payButton} onPress={handlePay}>
        <Text style={styles.payButtonText}>Pay Now</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 32 },
  summary: { marginBottom: 32, alignItems: 'center' },
  label: { fontSize: 16, color: Colors.neutral[700], marginTop: 8 },
  value: { fontSize: 16, color: Colors.neutral[900], marginBottom: 4 },
  total: { fontSize: 22, fontWeight: 'bold', color: Colors.accent[700], marginTop: 8 },
  payButton: {
    backgroundColor: Colors.accent[600],
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    width: 200,
  },
  payButtonText: { color: Colors.white, fontSize: 18, fontWeight: 'bold' },
});