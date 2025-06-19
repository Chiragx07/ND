import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Colors } from '@/constants/colors';
import { ArrowLeft, Star, MapPin, Clock, Filter, Search, Droplets } from 'lucide-react-native';

const waterVendors = [
  {
    id: '1',
    name: 'Pure Water Co.',
    businessName: 'Crystal Clear Water',
    area: 'HSR Layout',
    distance: '0.5 km',
    rating: 4.9,
    reviewCount: 203,
    isOnline: true,
    image: 'https://images.pexels.com/photos/327090/pexels-photo-327090.jpeg?auto=compress&cs=tinysrgb&w=400',
    brands: ['Bisleri', 'Kinley', 'Aquafina'],
    priceRange: '₹40-60/jar',
    minOrder: '2 jars',
    deliveryTime: '2-4 hours',
    jarSize: '20L',
  },
  {
    id: '2',
    name: 'Aqua Fresh',
    businessName: 'Premium Water Supply',
    area: 'Koramangala',
    distance: '1.1 km',
    rating: 4.7,
    reviewCount: 156,
    isOnline: true,
    image: 'https://images.pexels.com/photos/1000084/pexels-photo-1000084.jpeg?auto=compress&cs=tinysrgb&w=400',
    brands: ['Bisleri', 'RO Water'],
    priceRange: '₹35-55/jar',
    minOrder: '1 jar',
    deliveryTime: '1-3 hours',
    jarSize: '20L',
  },
  {
    id: '3',
    name: 'H2O Express',
    businessName: 'Fast Water Delivery',
    area: 'BTM Layout',
    distance: '1.8 km',
    rating: 4.5,
    reviewCount: 89,
    isOnline: false,
    image: 'https://images.pexels.com/photos/416528/pexels-photo-416528.jpeg?auto=compress&cs=tinysrgb&w=400',
    brands: ['Kinley', 'Aquafina', 'Local RO'],
    priceRange: '₹30-50/jar',
    minOrder: '3 jars',
    deliveryTime: '3-5 hours',
    jarSize: '20L',
  },
];

export default function WaterServiceScreen() {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filteredVendors = selectedFilter === 'all' 
    ? waterVendors 
    : waterVendors.filter(vendor => 
        selectedFilter === 'online' ? vendor.isOnline : !vendor.isOnline
      );

  const VendorCard = ({ vendor }: { vendor: typeof waterVendors[0] }) => (
    <TouchableOpacity
      style={styles.vendorCard}
      onPress={() => router.push(`/services/water/vendor/${vendor.id}`)}
      activeOpacity={0.8}
    >
      <Image source={{ uri: vendor.image }} style={styles.vendorImage} />
      
      <View style={styles.vendorInfo}>
        <View style={styles.vendorHeader}>
          <View>
            <Text style={styles.vendorName}>{vendor.name}</Text>
            <Text style={styles.businessName}>{vendor.businessName}</Text>
          </View>
          <View style={[
            styles.statusBadge,
            { backgroundColor: vendor.isOnline ? Colors.success[50] : Colors.neutral[100] }
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

        <View style={styles.locationRow}>
          <MapPin size={14} color={Colors.neutral[500]} />
          <Text style={styles.locationText}>{vendor.area} • {vendor.distance}</Text>
        </View>

        <View style={styles.ratingRow}>
          <Star size={14} color={Colors.warning[500]} fill={Colors.warning[500]} />
          <Text style={styles.ratingText}>{vendor.rating}</Text>
          <Text style={styles.reviewText}>({vendor.reviewCount} reviews)</Text>
        </View>

        <View style={styles.brandsContainer}>
          <Droplets size={14} color={Colors.secondary[600]} />
          <Text style={styles.brandsText}>{vendor.brands.join(', ')}</Text>
        </View>

        <View style={styles.vendorFooter}>
          <View>
            <Text style={styles.priceRange}>{vendor.priceRange}</Text>
            <Text style={styles.jarSize}>{vendor.jarSize} jars • Min: {vendor.minOrder}</Text>
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
        <Text style={styles.title}>Water Delivery</Text>
        <TouchableOpacity style={styles.searchButton}>
          <Search size={24} color={Colors.neutral[600]} />
        </TouchableOpacity>
      </View>

      <View style={styles.filterContainer}>
        {['all', 'online', 'offline'].map((filter) => (
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
          Pure drinking water delivered to your doorstep in 20L jars
        </Text>

        {filteredVendors.map((vendor) => (
          <VendorCard key={vendor.id} vendor={vendor} />
        ))}

        {filteredVendors.length === 0 && (
          <View style={styles.emptyState}>
            <Droplets size={48} color={Colors.neutral[400]} />
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
    backgroundColor: Colors.secondary[600],
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
  brandsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 6,
  },
  brandsText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: Colors.secondary[600],
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
  jarSize: {
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