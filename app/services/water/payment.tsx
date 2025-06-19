import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { Colors } from '@/constants/colors';
import { ArrowLeft, CreditCard, Smartphone, Wallet, Shield, Droplets } from 'lucide-react-native';

const paymentMethods = [
  {
    id: 'upi',
    name: 'UPI',
    description: 'Pay using UPI apps',
    icon: Smartphone,
    popular: true,
  },
  {
    id: 'card',
    name: 'Credit/Debit Card',
    description: 'Visa, Mastercard, RuPay',
    icon: CreditCard,
    popular: false,
  },
  {
    id: 'wallet',
    name: 'Digital Wallet',
    description: 'Paytm, PhonePe, Google Pay',
    icon: Wallet,
    popular: false,
  },
];

export default function WaterPaymentScreen() {
  const { bookingData } = useLocalSearchParams();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('upi');
  const [processing, setProcessing] = useState(false);

  const booking = bookingData ? JSON.parse(bookingData as string) : null;

  if (!booking) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Invalid booking data</Text>
      </SafeAreaView>
    );
  }

  const handlePayment = async () => {
    setProcessing(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      Alert.alert(
        'Payment Successful!',
        `Your ${booking.type} water delivery booking has been confirmed. The vendor will contact you shortly.`,
        [
          {
            text: 'View Orders',
            onPress: () => router.replace('/(tabs)/orders'),
          },
          {
            text: 'Go Home',
            onPress: () => router.replace('/(tabs)'),
          },
        ]
      );
    } catch (error) {
      Alert.alert('Payment Failed', 'Please try again or use a different payment method.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color={Colors.neutral[700]} />
        </TouchableOpacity>
        <Text style={styles.title}>Payment</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Order Summary */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryHeader}>
            <Droplets size={24} color={Colors.secondary[600]} />
            <Text style={styles.summaryTitle}>Water Delivery Order</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Brand</Text>
            <Text style={styles.summaryValue}>{booking.brand || 'Kinley'}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Quantity</Text>
            <Text style={styles.summaryValue}>{booking.quantity} jars (20L each)</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Type</Text>
            <Text style={styles.summaryValue}>
              {booking.type === 'subscription' ? `${booking.frequency} subscription` : 'One-time delivery'}
            </Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.summaryRow}>
            <Text style={styles.totalLabel}>Total Amount</Text>
            <Text style={styles.totalValue}>₹{booking.total}</Text>
          </View>
        </View>

        {/* Payment Methods */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Choose Payment Method</Text>
          {paymentMethods.map((method) => {
            const IconComponent = method.icon;
            return (
              <TouchableOpacity
                key={method.id}
                style={[
                  styles.paymentMethod,
                  selectedPaymentMethod === method.id && styles.selectedPaymentMethod
                ]}
                onPress={() => setSelectedPaymentMethod(method.id)}
              >
                <View style={styles.paymentMethodLeft}>
                  <View style={styles.paymentMethodIcon}>
                    <IconComponent size={24} color={Colors.secondary[600]} />
                  </View>
                  <View style={styles.paymentMethodInfo}>
                    <View style={styles.paymentMethodHeader}>
                      <Text style={styles.paymentMethodName}>{method.name}</Text>
                      {method.popular && (
                        <View style={styles.popularBadge}>
                          <Text style={styles.popularText}>Popular</Text>
                        </View>
                      )}
                    </View>
                    <Text style={styles.paymentMethodDescription}>{method.description}</Text>
                  </View>
                </View>
                <View style={[
                  styles.radioButton,
                  selectedPaymentMethod === method.id && styles.selectedRadioButton
                ]}>
                  {selectedPaymentMethod === method.id && (
                    <View style={styles.radioButtonInner} />
                  )}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Security Info */}
        <View style={styles.securityCard}>
          <Shield size={20} color={Colors.success[600]} />
          <View style={styles.securityInfo}>
            <Text style={styles.securityTitle}>Secure Payment</Text>
            <Text style={styles.securityDescription}>
              Your payment information is encrypted and secure
            </Text>
          </View>
        </View>

        {/* Terms */}
        <Text style={styles.termsText}>
          By proceeding, you agree to our Terms of Service and Privacy Policy. 
          {booking.type === 'subscription' && ' You can cancel your subscription anytime from the app.'}
        </Text>
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.totalContainer}>
          <Text style={styles.footerTotal}>₹{booking.total}</Text>
          <Text style={styles.footerNote}>
            {booking.type === 'subscription' ? `${booking.frequency} billing` : 'one-time payment'}
          </Text>
        </View>
        <TouchableOpacity
          style={[styles.payButton, processing && styles.processingButton]}
          onPress={handlePayment}
          disabled={processing}
        >
          {processing ? (
            <Text style={styles.payButtonText}>Processing...</Text>
          ) : (
            <Text style={styles.payButtonText}>Pay Now</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.neutral[50],
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: Colors.neutral[900],
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 120,
  },
  summaryCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  summaryTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: Colors.neutral[900],
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: Colors.neutral[600],
  },
  summaryValue: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: Colors.neutral[900],
  },
  divider: {
    height: 1,
    backgroundColor: Colors.neutral[200],
    marginVertical: 12,
  },
  totalLabel: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: Colors.neutral[900],
  },
  totalValue: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: Colors.secondary[600],
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: Colors.neutral[900],
    marginBottom: 16,
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: Colors.neutral[200],
  },
  selectedPaymentMethod: {
    borderColor: Colors.secondary[600],
    backgroundColor: Colors.secondary[50],
  },
  paymentMethodLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  paymentMethodIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.secondary[50],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  paymentMethodInfo: {
    flex: 1,
  },
  paymentMethodHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  paymentMethodName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: Colors.neutral[900],
    marginRight: 8,
  },
  popularBadge: {
    backgroundColor: Colors.success[500],
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  popularText: {
    fontSize: 10,
    fontFamily: 'Inter-SemiBold',
    color: Colors.white,
  },
  paymentMethodDescription: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: Colors.neutral[500],
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.neutral[300],
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedRadioButton: {
    borderColor: Colors.secondary[600],
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.secondary[600],
  },
  securityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.success[50],
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    gap: 12,
  },
  securityInfo: {
    flex: 1,
  },
  securityTitle: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: Colors.success[700],
    marginBottom: 2,
  },
  securityDescription: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: Colors.success[600],
  },
  termsText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: Colors.neutral[500],
    lineHeight: 16,
    textAlign: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.white,
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: Colors.neutral[200],
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  totalContainer: {
    flex: 1,
  },
  footerTotal: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: Colors.neutral[900],
  },
  footerNote: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: Colors.neutral[500],
  },
  payButton: {
    backgroundColor: Colors.secondary[600],
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 12,
  },
  processingButton: {
    backgroundColor: Colors.neutral[400],
  },
  payButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: Colors.white,
  },
});