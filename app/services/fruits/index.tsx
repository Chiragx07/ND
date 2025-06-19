import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Colors } from '@/constants/colors';
import { ArrowLeft, Star, MapPin, Clock, Filter, Search, Apple, Leaf } from 'lucide-react-native';

const fruitsVendors = [
  {
    id: '1',
    name: 'Green Basket',
    businessName: 'Fresh Fruits & Vegetables',
    area: 'HSR Layout',
    distance: '0.6 km',
    rating: 4.8,
    reviewCount: 189,
    isOnline: true,
    image: 'https://images.pexels.com/photos/1300972/pexels-photo-1300972.jpeg?auto=compress&cs=tinysrgb&w=400',
    specialties: ['Organic', 'Farm Fresh', 'Daily Harvest'],
    priceRange: '₹200-500/basket',
    minOrder: '₹150',
    deliveryTime: '2-4 hours',
    isOrganic: true,
  },
  {
    id: '2',
    name: 'Farm Direct',
    businessName: 'Organic Produce Store',
    area: 'Koramangala',
    distance: '1.3 km',
    rating: 4.6,
    reviewCount: 134,
    isOnline: true,
    image: 'https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg?auto=compress&cs=tinysrgb&w=400',
    specialties: ['Seasonal Fruits', 'Exotic Vegetables', 'Herbs'],
    priceRange: '₹180-450/basket',
    minOrder: '₹120',
    deliveryTime: '3-5 hours',
    isOrganic: true,
  },
  {
    id: '3',
    name: 'Fresh Market',
    businessName: 'Daily Fresh Produce',
    area: 'BTM Layout',
    distance: '2.0 km',
    rating: 4.4,
    reviewCount: 98,
    isOnline: false,
    image: 'https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg?auto=compress&cs=tinysrgb&w=400',
    specialties: ['Local Fruits', 'Vegetables', 'Bulk Orders'],
    priceRange: '₹150-400/basket',
    minOrder: '₹100',
    deliveryTime: '4-6 hours',
    isOrganic: false,
  },
];

export default function FruitsServiceScreen() {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const handleVendorSelect = useCallback((vendorId: string) => {
    router.push({ pathname: '/services/fruits/selection', params: { vendorId } });
  }, []);

  const filteredVendors = selectedFilter === 'all' 
    ? fruitsVendors 
    : selectedFilter === 'online' 
      ? fruitsVendors.filter(vendor => vendor.isOnline)
      : selectedFilter === 'organic'
        ? fruitsVendors.filter(vendor => vendor.isOrganic)
        : fruitsVendors.filter(vendor => !vendor.isOnline);

  const VendorCard = ({ vendor }: { vendor: typeof fruitsVendors[0] }) => (
    <TouchableOpacity
      style={styles.vendorCard}
      onPress={() => handleVendorSelect(vendor.id)}
      activeOpacity={0.8}
    >
      <Image source={{ uri: vendor.image }} style={styles.vendorImage} />
      <View style={styles.vendorInfo}>
        <View style={styles.vendorHeader}>
          <View>
            <Text style={styles.vendorName}>{vendor.name}</Text>
            <Text style={styles.businessName}>{vendor.businessName}</Text>
          </View>
          <View style={styles.badgeContainer}>
            {vendor.isOrganic && (
              <View style={styles.organicBadge}>
                <Leaf size={12} color={Colors.success[600]} />
                <Text style={styles.organicText}>Organic</Text>
              </View>
            )}
            <View style={[
              styles.statusBadge,
              { backgroundColor: vendor.isOnline ? Colors.success[500] : Colors.neutral[100] }
            ]}>
              <View style={[
                styles.statusDot,
                { backgroundColor: vendor.isOnline ? Colors.success[500] : Colors.neutral[400] }
              ]} />
              <Text style={[
                styles.statusText,
                { color: vendor.isOnline ? Colors.success[600] : Colors.neutral[500] }
              ]}>
                {vendor.isOnline ? 'Online' : 'Offline'}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.locationRow}>
          <MapPin size={14} color={Colors.neutral[500]} />
          <Text style={styles.locationText}>{vendor.area} • {vendor.distance}</Text>
        </View>
        <View style={styles.ratingRow}>
          <Star size={14} color={Colors.warning[500]} fill={Colors.warning[500]} />
          <Text style={styles.ratingText}>{vendor.rating}</Text>
          <Text style={styles.reviewText}>({vendor.reviewCount} reviews)</Text>
        </View>
        <View style={styles.specialtiesContainer}>
          <Apple size={14} color={Colors.accent[600]} />
          <Text style={styles.specialtiesText}>{vendor.specialties.join(', ')}</Text>
        </View>
        <View style={styles.vendorFooter}>
          <View>
            <Text style={styles.priceRange}>{vendor.priceRange}</Text>
            <Text style={styles.minOrder}>Min order: {vendor.minOrder}</Text>
          </View>
          <View style={styles.deliveryInfo}>
            <Clock size={12} color={Colors.neutral[500]} />
            <Text style={styles.deliveryTime}>{vendor.deliveryTime}</Text>
          </View>
        </View>
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
          <ArrowLeft size={24} color={Colors.neutral[700]} />
        </TouchableOpacity>
        <Text style={styles.title}>Fruits & Vegetables</Text>
        <TouchableOpacity style={styles.searchButton}>
          <Search size={24} color={Colors.neutral[600]} />
        </TouchableOpacity>
      </View>
      <View style={styles.filterContainer}>
        {['all', 'online', 'organic', 'offline'].map((filter) => (
          <TouchableOpacity
            key={filter}
            style={[styles.filterTab, selectedFilter === filter && styles.activeFilterTab]}
            onPress={() => setSelectedFilter(filter)}
          >
            <Text style={[
              styles.filterText,
              selectedFilter === filter && styles.activeFilterText
            ]}>
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={16} color={Colors.neutral[600]} />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.subtitle}>
          Fresh fruits and vegetables delivered from local farms and markets
        </Text>
        {filteredVendors.map((vendor) => (
          <VendorCard key={vendor.id} vendor={vendor} />
        ))}
        {filteredVendors.length === 0 && (
          <View style={styles.emptyState}>
            <Apple size={48} color={Colors.neutral[400]} />
            <Text style={styles.emptyTitle}>No vendors found</Text>
            <Text style={styles.emptyDescription}>
              Try adjusting your filters or check back later
            </Text>
          </View>
        )}
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
  searchButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
    alignItems: 'center',
    gap: 8,
  },
  filterTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.white,
  },
  activeFilterTab: {
    backgroundColor: Colors.accent[600],
  },
  filterText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: Colors.neutral[600],
  },
  activeFilterText: {
    color: Colors.white,
  },
  filterButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 'auto',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: Colors.neutral[600],
    marginBottom: 20,
    lineHeight: 20,
  },
  vendorCard: {
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
  vendorImage: {
    width: '100%',
    height: 120,
  },
  vendorInfo: {
    padding: 16,
  },
  vendorHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  vendorName: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: Colors.neutral[900],
    marginBottom: 2,
  },
  businessName: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: Colors.neutral[600],
  },
  badgeContainer: {
    alignItems: 'flex-end',
    gap: 4,
  },
  organicBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.success[500],
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    gap: 2,
  },
  organicText: {
    fontSize: 10,
    fontFamily: 'Inter-SemiBold',
    color: Colors.success[600],
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statusText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    gap: 4,
  },
  locationText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: Colors.neutral[500],
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 4,
  },
  ratingText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: Colors.neutral[900],
  },
  reviewText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: Colors.neutral[500],
  },
  specialtiesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 6,
  },
  specialtiesText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: Colors.accent[600],
    flex: 1,
  },
  vendorFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  priceRange: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: Colors.neutral[900],
    marginBottom: 2,
  },
  minOrder: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: Colors.neutral[500],
  },
  deliveryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  deliveryTime: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: Colors.neutral[500],
  },
  emptyState: {
    alignItems: 'center',
    paddingTop: 60,
  },
  emptyTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: Colors.neutral[900],
    marginTop: 16,
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: Colors.neutral[600],
    textAlign: 'center',
  },
});