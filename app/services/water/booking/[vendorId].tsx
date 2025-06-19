import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { Colors } from '@/constants/colors';
import { ArrowLeft, Calendar, Clock, MapPin, Plus, Minus, Droplets } from 'lucide-react-native';

const bookingData = {
  vendor: {
    name: 'Pure Water Co.',
    service: '20L Water Jars',
    price: 55,
    unit: 'per jar',
  },
  deliverySlots: [
    { id: '1', time: '8:00 AM - 10:00 AM', available: true },
    { id: '2', time: '10:00 AM - 12:00 PM', available: true },
    { id: '3', time: '2:00 PM - 4:00 PM', available: true },
    { id: '4', time: '4:00 PM - 6:00 PM', available: false },
  ],
  subscriptionOptions: [
    { id: 'weekly', label: 'Weekly', description: 'Once a week delivery' },
    { id: 'biweekly', label: 'Bi-weekly', description: 'Every 2 weeks delivery' },
    { id: 'monthly', label: 'Monthly', description: 'Once a month delivery' },
  ],
  waterBrands: [
    { id: 'bisleri', name: 'Bisleri', price: 60 },
    { id: 'kinley', name: 'Kinley', price: 55 },
    { id: 'ro-water', name: 'RO Water', price: 45 },
  ],
};

export default function WaterBookingScreen() {
  const { vendorId } = useLocalSearchParams();
  const [bookingType, setBookingType] = useState<'subscription' | 'onetime'>('onetime');
  const [quantity, setQuantity] = useState(2);
  const [selectedSlot, setSelectedSlot] = useState('1');
  const [selectedFrequency, setSelectedFrequency] = useState('weekly');
  const [selectedBrand, setSelectedBrand] = useState('kinley');
  const [startDate, setStartDate] = useState(new Date());
  const [address, setAddress] = useState('A-301, Green Valley Apartments, HSR Layout');

  const selectedBrandData = bookingData.waterBrands.find(brand => brand.id === selectedBrand);
  const currentPrice = selectedBrandData?.price || bookingData.vendor.price;

  const calculateTotal = () => {
    const basePrice = currentPrice * quantity;
    const deliveryFee = 0; // Free delivery
    return basePrice + deliveryFee;
  };

  const handleProceedToPayment = () => {
    const bookingDetails = {
      vendorId,
      type: bookingType,
      quantity,
      slot: selectedSlot,
      frequency: selectedFrequency,
      brand: selectedBrand,
      startDate: startDate.toISOString(),
      address,
      total: calculateTotal(),
    };

    router.push({
      pathname: '/services/water/payment',
      params: { bookingData: JSON.stringify(bookingDetails) },
    });
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
        <Text style={styles.title}>Book Water Delivery</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Service Summary */}
        <View style={styles.serviceCard}>
          <View style={styles.serviceHeader}>
            <Droplets size={24} color={Colors.secondary[600]} />
            <View style={styles.serviceInfo}>
              <Text style={styles.vendorName}>{bookingData.vendor.name}</Text>
              <Text style={styles.serviceName}>{bookingData.vendor.service}</Text>
            </View>
          </View>
        </View>

        {/* Water Brand Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Water Brand</Text>
          <View style={styles.brandContainer}>
            {bookingData.waterBrands.map((brand) => (
              <TouchableOpacity
                key={brand.id}
                style={[
                  styles.brandOption,
                  selectedBrand === brand.id && styles.activeBrandOption
                ]}
                onPress={() => setSelectedBrand(brand.id)}
              >
                <Text style={[
                  styles.brandName,
                  selectedBrand === brand.id && styles.activeBrandName
                ]}>
                  {brand.name}
                </Text>
                <Text style={[
                  styles.brandPrice,
                  selectedBrand === brand.id && styles.activeBrandPrice
                ]}>
                  ₹{brand.price}/jar
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Booking Type */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Booking Type</Text>
          <View style={styles.bookingTypeContainer}>
            <TouchableOpacity
              style={[
                styles.bookingTypeButton,
                bookingType === 'onetime' && styles.activeBookingType
              ]}
              onPress={() => setBookingType('onetime')}
            >
              <Text style={[
                styles.bookingTypeText,
                bookingType === 'onetime' && styles.activeBookingTypeText
              ]}>
                One-time
              </Text>
              <Text style={styles.bookingTypeDescription}>Single delivery</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.bookingTypeButton,
                bookingType === 'subscription' && styles.activeBookingType
              ]}
              onPress={() => setBookingType('subscription')}
            >
              <Text style={[
                styles.bookingTypeText,
                bookingType === 'subscription' && styles.activeBookingTypeText
              ]}>
                Subscription
              </Text>
              <Text style={styles.bookingTypeDescription}>Regular delivery</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Quantity */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Number of Jars</Text>
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => setQuantity(Math.max(1, quantity - 1))}
            >
              <Minus size={20} color={Colors.secondary[600]} />
            </TouchableOpacity>
            <Text style={styles.quantityText}>{quantity} Jars</Text>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => setQuantity(quantity + 1)}
            >
              <Plus size={20} color={Colors.secondary[600]} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Delivery Frequency (for subscription) */}
        {bookingType === 'subscription' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Delivery Frequency</Text>
            <View style={styles.frequencyContainer}>
              {bookingData.subscriptionOptions.map((option) => (
                <TouchableOpacity
                  key={option.id}
                  style={[
                    styles.frequencyOption,
                    selectedFrequency === option.id && styles.activeFrequencyOption
                  ]}
                  onPress={() => setSelectedFrequency(option.id)}
                >
                  <Text style={[
                    styles.frequencyLabel,
                    selectedFrequency === option.id && styles.activeFrequencyLabel
                  ]}>
                    {option.label}
                  </Text>
                  <Text style={styles.frequencyDescription}>{option.description}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Delivery Time */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Delivery Time</Text>
          <View style={styles.slotsContainer}>
            {bookingData.deliverySlots.map((slot) => (
              <TouchableOpacity
                key={slot.id}
                style={[
                  styles.slotButton,
                  selectedSlot === slot.id && styles.activeSlot,
                  !slot.available && styles.unavailableSlot
                ]}
                onPress={() => slot.available && setSelectedSlot(slot.id)}
                disabled={!slot.available}
              >
                <Clock size={16} color={
                  !slot.available ? Colors.neutral[400] :
                  selectedSlot === slot.id ? Colors.white : Colors.neutral[600]
                } />
                <Text style={[
                  styles.slotText,
                  selectedSlot === slot.id && styles.activeSlotText,
                  !slot.available && styles.unavailableSlotText
                ]}>
                  {slot.time}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Delivery Address */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Delivery Address</Text>
          <TouchableOpacity style={styles.addressCard}>
            <MapPin size={20} color={Colors.secondary[600]} />
            <View style={styles.addressInfo}>
              <Text style={styles.addressText}>{address}</Text>
              <Text style={styles.changeAddressText}>Tap to change</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Price Breakdown */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Price Breakdown</Text>
          <View style={styles.priceCard}>
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>
                {selectedBrandData?.name} × {quantity} jars
              </Text>
              <Text style={styles.priceValue}>₹{currentPrice * quantity}</Text>
            </View>
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>Delivery Fee</Text>
              <Text style={styles.priceValue}>Free</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.priceRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>₹{calculateTotal()}</Text>
            </View>
            {bookingType === 'subscription' && (
              <Text style={styles.subscriptionNote}>
                *This amount will be charged {selectedFrequency}
              </Text>
            )}
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.totalContainer}>
          <Text style={styles.footerTotal}>₹{calculateTotal()}</Text>
          <Text style={styles.footerNote}>
            {bookingType === 'subscription' ? `${selectedFrequency} billing` : 'one-time payment'}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.proceedButton}
          onPress={handleProceedToPayment}
        >
          <Text style={styles.proceedButtonText}>Proceed to Payment</Text>
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
  serviceCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  serviceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  serviceInfo: {
    flex: 1,
  },
  vendorName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: Colors.neutral[900],
    marginBottom: 4,
  },
  serviceName: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: Colors.neutral[600],
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: Colors.neutral[900],
    marginBottom: 12,
  },
  brandContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  brandOption: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 12,
    borderWidth: 2,
    borderColor: Colors.neutral[200],
    alignItems: 'center',
  },
  activeBrandOption: {
    borderColor: Colors.secondary[600],
    backgroundColor: Colors.secondary[50],
  },
  brandName: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: Colors.neutral[900],
    marginBottom: 4,
  },
  activeBrandName: {
    color: Colors.secondary[600],
  },
  brandPrice: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: Colors.neutral[500],
  },
  activeBrandPrice: {
    color: Colors.secondary[600],
  },
  bookingTypeContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  bookingTypeButton: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: Colors.neutral[200],
  },
  activeBookingType: {
    borderColor: Colors.secondary[600],
    backgroundColor: Colors.secondary[50],
  },
  bookingTypeText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: Colors.neutral[900],
    marginBottom: 4,
  },
  activeBookingTypeText: {
    color: Colors.secondary[600],
  },
  bookingTypeDescription: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: Colors.neutral[500],
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    gap: 20,
  },
  quantityButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.secondary[50],
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: Colors.neutral[900],
    minWidth: 80,
    textAlign: 'center',
  },
  frequencyContainer: {
    gap: 8,
  },
  frequencyOption: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: Colors.neutral[200],
  },
  activeFrequencyOption: {
    borderColor: Colors.secondary[600],
    backgroundColor: Colors.secondary[50],
  },
  frequencyLabel: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: Colors.neutral[900],
    marginBottom: 4,
  },
  activeFrequencyLabel: {
    color: Colors.secondary[600],
  },
  frequencyDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: Colors.neutral[500],
  },
  slotsContainer: {
    gap: 8,
  },
  slotButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: Colors.neutral[200],
    gap: 12,
  },
  activeSlot: {
    borderColor: Colors.secondary[600],
    backgroundColor: Colors.secondary[600],
  },
  unavailableSlot: {
    backgroundColor: Colors.neutral[100],
    borderColor: Colors.neutral[200],
  },
  slotText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: Colors.neutral[900],
  },
  activeSlotText: {
    color: Colors.white,
  },
  unavailableSlotText: {
    color: Colors.neutral[400],
  },
  addressCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    gap: 12,
  },
  addressInfo: {
    flex: 1,
  },
  addressText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: Colors.neutral[900],
    marginBottom: 4,
  },
  changeAddressText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: Colors.secondary[600],
  },
  priceCard: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  priceLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: Colors.neutral[600],
  },
  priceValue: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: Colors.neutral[900],
  },
  divider: {
    height: 1,
    backgroundColor: Colors.neutral[200],
    marginVertical: 8,
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
  subscriptionNote: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: Colors.neutral[500],
    marginTop: 8,
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
  proceedButton: {
    backgroundColor: Colors.secondary[600],
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  proceedButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: Colors.white,
  },
});