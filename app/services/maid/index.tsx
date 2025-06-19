import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Colors } from '@/constants/colors';
import { ArrowLeft, Star, MapPin, Clock, Filter, Search, Sparkles, CircleCheck as CheckCircle } from 'lucide-react-native';

const maidServices = [
  {
    id: '1',
    name: 'Priya Sharma',
    businessName: 'Professional House Cleaning',
    area: 'HSR Layout',
    distance: '0.4 km',
    rating: 4.9,
    reviewCount: 167,
    isOnline: true,
    image: 'https://images.pexels.com/photos/6195122/pexels-photo-6195122.jpeg?auto=compress&cs=tinysrgb&w=400',
    services: ['House Cleaning', 'Cooking', 'Laundry'],
    priceRange: '₹300-500/day',
    experience: '5+ years',
    availability: 'Full-time',
    isVerified: true,
    languages: ['English', 'Hindi', 'Kannada'],
  },
  {
    id: '2',
    name: 'Lakshmi Devi',
    businessName: 'Home Care Services',
    area: 'Koramangala',
    distance: '1.1 km',
    rating: 4.7,
    reviewCount: 134,
    isOnline: true,
    image: 'https://images.pexels.com/photos/6195267/pexels-photo-6195267.jpeg?auto=compress&cs=tinysrgb&w=400',
    services: ['Cooking', 'Baby Care', 'House Cleaning'],
    priceRange: '₹400-600/day',
    experience: '8+ years',
    availability: 'Part-time',
    isVerified: true,
    languages: ['Hindi', 'Kannada', 'Tamil'],
  },
  {
    id: '3',
    name: 'Sunita Kumari',
    businessName: 'Reliable Maid Services',
    area: 'BTM Layout',
    distance: '1.8 km',
    rating: 4.5,
    reviewCount: 89,
    isOnline: false,
    image: 'https://images.pexels.com/photos/6195343/pexels-photo-6195343.jpeg?auto=compress&cs=tinysrgb&w=400',
    services: ['House Cleaning', 'Utensil Washing', 'Sweeping'],
    priceRange: '₹250-400/day',
    experience: '3+ years',
    availability: 'Full-time',
    isVerified: false,
    languages: ['Hindi', 'English'],
  },
];

export default function MaidServiceScreen() {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filteredServices = selectedFilter === 'all' 
    ? maidServices 
    : selectedFilter === 'online' 
      ? maidServices.filter(service => service.isOnline)
      : selectedFilter === 'verified'
        ? maidServices.filter(service => service.isVerified)
        : maidServices.filter(service => !service.isOnline);

  const ServiceCard = ({ service }: { service: typeof maidServices[0] }) => (
    <TouchableOpacity
      style={styles.serviceCard}
      onPress={() => router.push({ pathname: '/services/maid/booking/[vendorID]', params: { vendorID: service.id } })}
      activeOpacity={0.8}
    >
      <Image source={{ uri: service.image }} style={styles.serviceImage} />
      
      <View style={styles.serviceInfo}>
        <View style={styles.serviceHeader}>
          <View>
            <View style={styles.nameContainer}>
              <Text style={styles.serviceName}>{service.name}</Text>
              {service.isVerified && (
                <CheckCircle size={16} color={Colors.success[500]} />
              )}
            </View>
            <Text style={styles.businessName}>{service.businessName}</Text>
          </View>
          <View style={[
            styles.statusBadge,
            { backgroundColor: service.isOnline ? Colors.success[500] : Colors.neutral[100] }
          ]}>
            <View style={[
              styles.statusDot,
              { backgroundColor: service.isOnline ? Colors.success[500] : Colors.neutral[400] }
            ]} />
            <Text style={[
              styles.statusText,
              { color: service.isOnline ? Colors.success[600] : Colors.neutral[500] }
            ]}>
              {service.isOnline ? 'Available' : 'Busy'}
            </Text>
          </View>
        </View>

        <View style={styles.locationRow}>
          <MapPin size={14} color={Colors.neutral[500]} />
          <Text style={styles.locationText}>{service.area} • {service.distance}</Text>
        </View>

        <View style={styles.ratingRow}>
          <Star size={14} color={Colors.warning[500]} fill={Colors.warning[500]} />
          <Text style={styles.ratingText}>{service.rating}</Text>
          <Text style={styles.reviewText}>({service.reviewCount} reviews)</Text>
          <Text style={styles.experienceText}>• {service.experience} exp</Text>
        </View>

        <View style={styles.servicesContainer}>
          <Sparkles size={14} color={Colors.neutral[700]} />
          <Text style={styles.servicesText}>{service.services.join(', ')}</Text>
        </View>

        <View style={styles.languagesContainer}>
          <Text style={styles.languagesLabel}>Languages: </Text>
          <Text style={styles.languagesText}>{service.languages.join(', ')}</Text>
        </View>

        <View style={styles.serviceFooter}>
          <View>
            <Text style={styles.priceRange}>{service.priceRange}</Text>
            <Text style={styles.availability}>{service.availability}</Text>
          </View>
          <TouchableOpacity style={styles.bookButton}>
            <Text style={styles.bookButtonText}>Book Now</Text>
          </TouchableOpacity>
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
        <Text style={styles.title}>Maid Services</Text>
        <TouchableOpacity style={styles.searchButton}>
          <Search size={24} color={Colors.neutral[600]} />
        </TouchableOpacity>
      </View>

      <View style={styles.filterContainer}>
        {['all', 'online', 'verified', 'offline'].map((filter) => (
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
          Professional and trusted maid services for house cleaning, cooking, and more
        </Text>

        {filteredServices.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}

        {filteredServices.length === 0 && (
          <View style={styles.emptyState}>
            <Sparkles size={48} color={Colors.neutral[400]} />
            <Text style={styles.emptyTitle}>No services found</Text>
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
    backgroundColor: Colors.neutral[700],
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
  serviceImage: {
    width: '100%',
    height: 120,
  },
  serviceInfo: {
    padding: 16,
  },
  serviceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  serviceName: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: Colors.neutral[900],
  },
  businessName: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: Colors.neutral[600],
    marginTop: 2,
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
  experienceText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: Colors.neutral[700],
  },
  servicesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 6,
  },
  servicesText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: Colors.neutral[700],
    flex: 1,
  },
  languagesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  languagesLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: Colors.neutral[600],
  },
  languagesText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: Colors.neutral[500],
  },
  serviceFooter: {
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
  availability: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: Colors.neutral[500],
  },
  bookButton: {
    backgroundColor: Colors.neutral[700],
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  bookButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: Colors.white,
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