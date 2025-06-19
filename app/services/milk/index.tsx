import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Colors } from '@/constants/colors';
import { ArrowLeft, Star, MapPin, Clock, Filter, Search } from 'lucide-react-native';

const milkVendors = [
  {
    id: '1',
    name: 'Fresh Dairy Farm',
    businessName: 'Organic Milk Co.',
    area: 'HSR Layout',
    distance: '0.8 km',
    rating: 4.8,
    reviewCount: 156,
    isOnline: true,
    image: 'https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg?auto=compress&cs=tinysrgb&w=400',
    milkTypes: ['Cow Milk', 'Buffalo Milk', 'Toned Milk'],
    priceRange: '₹45-65/L',
    minOrder: '1L',
    deliveryTime: '6:00 AM - 8:00 AM',
    subscription: true,
  },
  {
    id: '2',
    name: 'Pure Milk Dairy',
    businessName: 'Farm Fresh Milk',
    area: 'Koramangala',
    distance: '1.2 km',
    rating: 4.6,
    reviewCount: 89,
    isOnline: true,
    image: 'https://images.pexels.com/photos/1446318/pexels-photo-1446318.jpeg?auto=compress&cs=tinysrgb&w=400',
    milkTypes: ['Cow Milk', 'A2 Milk'],
    priceRange: '₹50-80/L',
    minOrder: '500ml',
    deliveryTime: '5:30 AM - 7:30 AM',
    subscription: true,
  },
  {
    id: '3',
    name: 'Heritage Dairy',
    businessName: 'Traditional Milk Supply',
    area: 'BTM Layout',
    distance: '2.1 km',
    rating: 4.4,
    reviewCount: 234,
    isOnline: false,
    image: 'https://images.pexels.com/photos/1435735/pexels-photo-1435735.jpeg?auto=compress&cs=tinysrgb&w=400',
    milkTypes: ['Buffalo Milk', 'Cow Milk', 'Goat Milk'],
    priceRange: '₹40-70/L',
    minOrder: '1L',
    deliveryTime: '6:30 AM - 8:30 AM',
    subscription: true,
  },
];

export default function MilkServiceScreen() {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filteredVendors = selectedFilter === 'all' 
    ? milkVendors 
    : milkVendors.filter(vendor => 
        selectedFilter === 'online' ? vendor.isOnline : !vendor.isOnline
      );

  const VendorCard = ({ vendor }: { vendor: typeof milkVendors[0] }) => (
    <TouchableOpacity
      style={styles.vendorCard}
      onPress={() => router.push(`/services/milk/vendor/${vendor.id}`)}
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

        <View style={styles.milkTypes}>
          {vendor.milkTypes.slice(0, 2).map((type, index) => (
            <View key={index} style={styles.typeTag}>
              <Text style={styles.typeText}>{type}</Text>
            </View>
          ))}
          {vendor.milkTypes.length > 2 && (
            <Text style={styles.moreTypes}>+{vendor.milkTypes.length - 2} more</Text>
          )}
        </View>

        <View style={styles.vendorFooter}>
          <View>
            <Text style={styles.priceRange}>{vendor.priceRange}</Text>
            <Text style={styles.minOrder}>Min: {vendor.minOrder}</Text>
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
        <Text style={styles.title}>Milk Delivery</Text>
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
          Fresh milk delivered daily from trusted local dairy farms
        </Text>

        {filteredVendors.map((vendor) => (
          <VendorCard key={vendor.id} vendor={vendor} />
        ))}

        {filteredVendors.length === 0 && (
          <View style={styles.emptyState}>
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
    backgroundColor: Colors.primary[600],
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
    marginBottom: 12,
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
  milkTypes: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 6,
  },
  typeTag: {
    backgroundColor: Colors.primary[50],
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  typeText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: Colors.primary[600],
  },
  moreTypes: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: Colors.neutral[500],
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
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: Colors.neutral[600],
    textAlign: 'center',
  },
});