import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { Colors } from '@/constants/colors';
import { ArrowLeft, Star, MapPin, Clock, Phone, MessageCircle, Heart } from 'lucide-react-native';

const vendorData = {
  '1': {
    id: '1',
    name: 'Fresh Dairy Farm',
    businessName: 'Organic Milk Co.',
    area: 'HSR Layout',
    distance: '0.8 km',
    rating: 4.8,
    reviewCount: 156,
    isOnline: true,
    phone: '+91 98765 43210',
    image: 'https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Premium quality organic milk from grass-fed cows. We maintain the highest standards of hygiene and freshness.',
    workingHours: '5:00 AM - 9:00 PM',
    deliveryTime: '6:00 AM - 8:00 AM',
    minOrder: 50,
    deliveryFee: 0,
    services: [
      {
        id: '1',
        name: 'Fresh Cow Milk',
        description: 'Pure cow milk, rich in nutrients',
        price: 55,
        unit: 'per litre',
        image: 'https://images.pexels.com/photos/248412/pexels-photo-248412.jpeg?auto=compress&cs=tinysrgb&w=400',
        available: true,
      },
      {
        id: '2',
        name: 'Buffalo Milk',
        description: 'Creamy buffalo milk, high in fat content',
        price: 65,
        unit: 'per litre',
        image: 'https://images.pexels.com/photos/1446318/pexels-photo-1446318.jpeg?auto=compress&cs=tinysrgb&w=400',
        available: true,
      },
      {
        id: '3',
        name: 'Toned Milk',
        description: 'Low-fat toned milk for health-conscious customers',
        price: 45,
        unit: 'per litre',
        image: 'https://images.pexels.com/photos/1435735/pexels-photo-1435735.jpeg?auto=compress&cs=tinysrgb&w=400',
        available: true,
      },
    ],
  },
};

export default function VendorDetailScreen() {
  const { id } = useLocalSearchParams();
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);

  const vendor = vendorData[id as keyof typeof vendorData];

  if (!vendor) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Vendor not found</Text>
      </SafeAreaView>
    );
  }

  const handleBookService = (serviceId: string) => {
    router.push(`/services/milk/booking/${vendor.id}?serviceId=${serviceId}`);
  };

  const ServiceCard = ({ service }: { service: typeof vendor.services[0] }) => (
    <TouchableOpacity
      style={[
        styles.serviceCard,
        selectedService === service.id && styles.selectedServiceCard
      ]}
      onPress={() => setSelectedService(service.id)}
      activeOpacity={0.8}
    >
      <Image source={{ uri: service.image }} style={styles.serviceImage} />
      <View style={styles.serviceInfo}>
        <Text style={styles.serviceName}>{service.name}</Text>
        <Text style={styles.serviceDescription}>{service.description}</Text>
        <View style={styles.servicePricing}>
          <Text style={styles.servicePrice}>₹{service.price}</Text>
          <Text style={styles.serviceUnit}>{service.unit}</Text>
        </View>
        <TouchableOpacity
          style={styles.bookButton}
          onPress={() => handleBookService(service.id)}
        >
          <Text style={styles.bookButtonText}>Book Now</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color={Colors.white} />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.favoriteButton}
          onPress={() => setIsFavorite(!isFavorite)}
        >
          <Heart 
            size={24} 
            color={isFavorite ? Colors.error[500] : Colors.white}
            fill={isFavorite ? Colors.error[500] : 'transparent'}
          />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.heroSection}>
          <Image source={{ uri: vendor.image }} style={styles.heroImage} />
          <View style={styles.heroOverlay}>
            <View style={[
              styles.statusBadge,
              { backgroundColor: vendor.isOnline ? Colors.success[500] : Colors.neutral[500] }
            ]}>
              <Text style={styles.statusText}>
                {vendor.isOnline ? 'Online' : 'Offline'}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.vendorInfo}>
          <Text style={styles.vendorName}>{vendor.name}</Text>
          <Text style={styles.businessName}>{vendor.businessName}</Text>
          
          <View style={styles.locationRow}>
            <MapPin size={16} color={Colors.neutral[500]} />
            <Text style={styles.locationText}>{vendor.area} • {vendor.distance}</Text>
          </View>

          <View style={styles.ratingRow}>
            <Star size={16} color={Colors.warning[500]} fill={Colors.warning[500]} />
            <Text style={styles.ratingText}>{vendor.rating}</Text>
            <Text style={styles.reviewText}>({vendor.reviewCount} reviews)</Text>
          </View>

          <Text style={styles.description}>{vendor.description}</Text>

          <View style={styles.infoGrid}>
            <View style={styles.infoItem}>
              <Clock size={16} color={Colors.primary[600]} />
              <Text style={styles.infoLabel}>Working Hours</Text>
              <Text style={styles.infoValue}>{vendor.workingHours}</Text>
            </View>
            <View style={styles.infoItem}>
              <Clock size={16} color={Colors.primary[600]} />
              <Text style={styles.infoLabel}>Delivery Time</Text>
              <Text style={styles.infoValue}>{vendor.deliveryTime}</Text>
            </View>
          </View>

          <View style={styles.contactButtons}>
            <TouchableOpacity style={styles.contactButton}>
              <Phone size={20} color={Colors.primary[600]} />
              <Text style={styles.contactButtonText}>Call</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.contactButton}>
              <MessageCircle size={20} color={Colors.primary[600]} />
              <Text style={styles.contactButtonText}>Message</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.servicesSection}>
          <Text style={styles.sectionTitle}>Available Services</Text>
          {vendor.services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.neutral[50],
  },
  header: {
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    zIndex: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    paddingBottom: 20,
  },
  heroSection: {
    position: 'relative',
    height: 250,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    position: 'absolute',
    bottom: 16,
    right: 16,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: Colors.white,
  },
  vendorInfo: {
    padding: 20,
    backgroundColor: Colors.white,
    marginTop: -20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  vendorName: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: Colors.neutral[900],
    marginBottom: 4,
  },
  businessName: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: Colors.neutral[600],
    marginBottom: 12,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 6,
  },
  locationText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: Colors.neutral[500],
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 4,
  },
  ratingText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: Colors.neutral[900],
  },
  reviewText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: Colors.neutral[500],
  },
  description: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: Colors.neutral[700],
    lineHeight: 20,
    marginBottom: 20,
  },
  infoGrid: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 20,
  },
  infoItem: {
    flex: 1,
    backgroundColor: Colors.neutral[50],
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: Colors.neutral[600],
    marginTop: 4,
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: Colors.neutral[900],
    textAlign: 'center',
  },
  contactButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  contactButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary[50],
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  contactButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: Colors.primary[600],
  },
  servicesSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: Colors.neutral[900],
    marginBottom: 16,
  },
  serviceCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
    overflow: 'hidden',
  },
  selectedServiceCard: {
    borderWidth: 2,
    borderColor: Colors.primary[600],
  },
  serviceImage: {
    width: '100%',
    height: 120,
  },
  serviceInfo: {
    padding: 16,
  },
  serviceName: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: Colors.neutral[900],
    marginBottom: 4,
  },
  serviceDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: Colors.neutral[600],
    marginBottom: 12,
    lineHeight: 20,
  },
  servicePricing: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 16,
    gap: 4,
  },
  servicePrice: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: Colors.neutral[900],
  },
  serviceUnit: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: Colors.neutral[500],
  },
  bookButton: {
    backgroundColor: Colors.primary[600],
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  bookButtonText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: Colors.white,
  },
});