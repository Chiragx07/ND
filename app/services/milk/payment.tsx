import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, FlatList, TextInput, Modal, Pressable, ScrollView, Image } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/colors';
import { Circle, CheckCircle2, CreditCard, IndianRupee, QrCode, Smartphone } from 'lucide-react-native';

const paymentMethods = [
  { id: 'upi', name: 'UPI', icon: <Smartphone size={24} color={Colors.accent[700]} /> },
  { id: 'card', name: 'Credit/Debit Card', icon: <CreditCard size={24} color={Colors.accent[700]} /> },
  { id: 'cash', name: 'Cash on Delivery', icon: <IndianRupee size={24} color={Colors.accent[700]} /> },
];

export default function MilkPaymentScreen() {
  const { vendorId, start, end, days, total } = useLocalSearchParams<{
    vendorId: string;
    start: string;
    end: string;
    days: string;
    total: string;
  }>();

  const [selectedMethod, setSelectedMethod] = useState('upi');
  // Card modal state
  const [showCardModal, setShowCardModal] = useState(false);
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [cardError, setCardError] = useState('');
  // UPI state
  const [upiOption, setUpiOption] = useState<'id' | 'qr' | null>(null);
  const [upiId, setUpiId] = useState('');
  const [upiError, setUpiError] = useState('');

  const handlePayment = () => {
    if (!selectedMethod) {
      Alert.alert('Please select a payment method');
      return;
    }
    if (selectedMethod === 'card') {
      setShowCardModal(true);
      return;
    }
    if (selectedMethod === 'upi') {
      if (!upiOption) {
        setUpiError('Please select UPI option');
        return;
      }
      if (upiOption === 'id' && !upiId) {
        setUpiError('Please enter your UPI ID');
        return;
      }
      setUpiError('');
      Alert.alert('Payment Successful', `Paid ₹${total} via UPI`, [
        { text: 'OK', onPress: () => router.replace('/') },
      ]);
      return;
    }
    Alert.alert('Payment Successful', `Paid ₹${total} via ${selectedMethod.toUpperCase()}`, [
      { text: 'OK', onPress: () => router.replace('/') },
    ]);
  };

  const handleCardPay = () => {
    if (!cardNumber || !cardHolder) {
      setCardError('Please enter all card details');
      return;
    }
    setCardError('');
    setShowCardModal(false);
    Alert.alert('Payment Successful', `Paid ₹${total} via CARD`, [
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
            style={[
              styles.methodItem,
              selectedMethod === item.id && styles.methodItemSelected,
            ]}
            onPress={() => {
              setSelectedMethod(item.id);
              setUpiOption(null);
              setUpiId('');
              setUpiError('');
            }}
            activeOpacity={0.85}
          >
            <View style={styles.iconCircle}>
              {item.icon}
            </View>
            <Text style={[
              styles.methodText,
              selectedMethod === item.id && styles.methodTextSelected,
            ]}>
              {item.name}
            </Text>
            <View style={{ flex: 1 }} />
            {selectedMethod === item.id ? (
              <CheckCircle2 size={22} color={Colors.success[600]} />
            ) : (
              <Circle size={22} color={Colors.neutral[400]} />
            )}
          </TouchableOpacity>
        )}
      />

      {/* UPI Options */}
      {selectedMethod === 'upi' && (
        <View style={styles.upiOptionsContainer}>
          <Text style={styles.upiTitle}>UPI Options</Text>
          <View style={{ flexDirection: 'row', gap: 12, marginBottom: 16 }}>
            <TouchableOpacity
              style={[
                styles.upiOptionBtn,
                upiOption === 'id' && styles.upiOptionBtnSelected,
              ]}
              onPress={() => setUpiOption('id')}
            >
              <Smartphone size={18} color={upiOption === 'id' ? Colors.white : Colors.accent[700]} style={{ marginRight: 6 }} />
              <Text style={upiOption === 'id' ? styles.upiOptionTextSelected : styles.upiOptionText}>
                Enter UPI ID
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.upiOptionBtn,
                upiOption === 'qr' && styles.upiOptionBtnSelected,
              ]}
              onPress={() => setUpiOption('qr')}
            >
              <QrCode size={18} color={upiOption === 'qr' ? Colors.white : Colors.accent[700]} style={{ marginRight: 6 }} />
              <Text style={upiOption === 'qr' ? styles.upiOptionTextSelected : styles.upiOptionText}>
                Scan QR
              </Text>
            </TouchableOpacity>
          </View>
          {upiOption === 'id' && (
            <TextInput
              style={styles.input}
              placeholder="Enter your UPI ID"
              value={upiId}
              onChangeText={setUpiId}
              autoCapitalize="none"
              placeholderTextColor={Colors.neutral[400]}
            />
          )}
          {upiOption === 'qr' && (
            <View style={{ alignItems: 'center', marginVertical: 12 }}>
              <Image
                source={{ uri: 'https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=upi://pay?pa=yourupi@bank' }}
                style={{ width: 180, height: 180, marginBottom: 8, borderRadius: 16, borderWidth: 2, borderColor: Colors.accent[200] }}
              />
              <Text style={{ color: Colors.neutral[600], fontSize: 14 }}>
                Scan this QR with your UPI app
              </Text>
            </View>
          )}
          {upiError ? (
            <Text style={{ color: 'red', marginTop: 4 }}>{upiError}</Text>
          ) : null}
        </View>
      )}

      <View style={styles.footer}>
        <View>
          <Text style={styles.totalLabel}>Total Amount</Text>
          <Text style={styles.totalAmount}>₹{total}</Text>
        </View>
        <TouchableOpacity style={styles.payButton} onPress={handlePayment}>
          <Text style={styles.payButtonText}>Pay Now</Text>
        </TouchableOpacity>
      </View>

      {/* Card Payment Modal */}
      <Modal
        visible={showCardModal}
        animationType="slide"
        transparent
        onRequestClose={() => setShowCardModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <ScrollView>
              <Text style={styles.modalTitle}>Enter Card Details</Text>
              <TextInput
                style={styles.input}
                placeholder="Card Number"
                keyboardType="number-pad"
                value={cardNumber}
                onChangeText={setCardNumber}
                maxLength={16}
                placeholderTextColor={Colors.neutral[400]}
              />
              <TextInput
                style={styles.input}
                placeholder="Card Holder Name"
                value={cardHolder}
                onChangeText={setCardHolder}
                autoCapitalize="words"
                placeholderTextColor={Colors.neutral[400]}
              />
              {cardError ? (
                <Text style={{ color: 'red', marginBottom: 8 }}>{cardError}</Text>
              ) : null}
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 }}>
                <Pressable
                  style={[styles.payButton, { backgroundColor: Colors.neutral[300], flex: 1, marginRight: 8 }]}
                  onPress={() => setShowCardModal(false)}
                >
                  <Text style={[styles.payButtonText, { color: Colors.neutral[800] }]}>Cancel</Text>
                </Pressable>
                <Pressable
                  style={[styles.payButton, { flex: 1, marginLeft: 8 }]}
                  onPress={handleCardPay}
                >
                  <Text style={styles.payButtonText}>Pay</Text>
                </Pressable>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
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
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: Colors.accent[700],
    marginBottom: 24,
    paddingHorizontal: 20,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  methodItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 18,
    marginBottom: 16,
    elevation: 2,
    gap: 14,
    borderWidth: 2,
    borderColor: Colors.white,
    shadowColor: Colors.accent[200],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  methodItemSelected: {
    borderColor: Colors.accent[600],
    backgroundColor: Colors.accent[50],
  },
  iconCircle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: Colors.accent[100],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  methodText: {
    fontSize: 17,
    fontFamily: 'Inter-Medium',
    color: Colors.neutral[800],
    letterSpacing: 0.2,
  },
  methodTextSelected: {
    color: Colors.accent[700],
    fontFamily: 'Inter-Bold',
  },
  upiOptionsContainer: {
    backgroundColor: Colors.white,
    marginHorizontal: 20,
    marginTop: 8,
    borderRadius: 16,
    padding: 18,
    elevation: 2,
    shadowColor: Colors.accent[200],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  upiTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: Colors.accent[700],
    marginBottom: 12,
    letterSpacing: 0.2,
  },
  upiOptionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.accent[400],
    borderRadius: 8,
    paddingVertical: 12,
    justifyContent: 'center',
    backgroundColor: Colors.white,
    marginRight: 0,
  },
  upiOptionBtnSelected: {
    backgroundColor: Colors.accent[600],
    borderColor: Colors.accent[600],
  },
  upiOptionText: {
    color: Colors.accent[700],
    fontFamily: 'Inter-Medium',
    fontSize: 15,
  },
  upiOptionTextSelected: {
    color: Colors.white,
    fontFamily: 'Inter-Bold',
    fontSize: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.accent[400],
    borderRadius: 8,
    padding: 14,
    marginBottom: 16,
    fontSize: 16,
    backgroundColor: Colors.neutral[50],
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 22,
    paddingHorizontal: 24,
    borderTopWidth: 1,
    borderColor: Colors.neutral[200],
    backgroundColor: Colors.white,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 20,
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 15,
    color: Colors.neutral[500],
    fontFamily: 'Inter-Regular',
  },
  totalAmount: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: Colors.accent[700],
    marginTop: 2,
  },
  payButton: {
    backgroundColor: Colors.success[600],
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 10,
    alignSelf: 'center',
    elevation: 2,
  },
  payButtonText: {
    color: Colors.white,
    fontSize: 17,
    fontFamily: 'Inter-SemiBold',
    letterSpacing: 0.2,
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.18)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: Colors.white,
    borderRadius: 18,
    padding: 28,
    width: '88%',
    elevation: 10,
  },
  modalTitle: {
    fontSize: 19,
    fontFamily: 'Inter-Bold',
    color: Colors.neutral[900],
    marginBottom: 24,
    textAlign: 'center',
  },
});