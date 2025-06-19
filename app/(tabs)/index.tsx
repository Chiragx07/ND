import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Colors } from '@/constants/colors';
import { 
  Milk, 
  Droplets, 
  Apple, 
  Sparkles, 
  MapPin, 
  Bell,
  ChevronRight 
} from 'lucide-react-native';

const services = [
  {
    id: 'milk',
    title: 'Milk Delivery',
    description: 'Fresh milk delivered daily',
    icon: Milk,
    color: Colors.primary[600],
    bgColor: Colors.primary[50],
    route: '/services/milk',
  },
  {
    id: 'water',
    title: 'Water Delivery',
    description: '20L jars & RO water',
    icon: Droplets,
    color: Colors.secondary[600],
    bgColor: Colors.secondary[50],
    route: '/services/water',
  },
  {
    id: 'fruits',
    title: 'Fruits & Vegetables',
    description: 'Fresh produce baskets',
    icon: Apple,
    color: Colors.accent[600],
    bgColor: Colors.accent[50],
    route: '/services/fruits',
  },
  {
    id: 'maid',
    title: 'Maid Services',
    description: 'Cleaning & cooking help',
    icon: Sparkles,
    color: Colors.neutral[700],
    bgColor: Colors.neutral[100],
    route: '/services/maid',
  },
];

export default function HomeScreen() {
  const handleServicePress = (route: string) => {
    router.push(route as any);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good Morning!</Text>
            <View style={styles.locationContainer}>
              <MapPin size={16} color={Colors.neutral[600]} />
              <Text style={styles.location}>HSR Layout, Bangalore</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Bell size={24} color={Colors.neutral[700]} />
          </TouchableOpacity>
        </View>

        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Image
            source={{ uri: 'https://images.pexels.com/photos/4792728/pexels-photo-4792728.jpeg?auto=compress&cs=tinysrgb&w=800' }}
            style={styles.heroImage}
          />
          <View style={styles.heroOverlay}>
            <Text style={styles.heroTitle}>Local Home Services</Text>
            <Text style={styles.heroSubtitle}>Trusted vendors in your neighborhood</Text>
          </View>
        </View>

        {/* Services Grid */}
        <View style={styles.servicesSection}>
          <Text style={styles.sectionTitle}>Our Services</Text>
          <View style={styles.servicesGrid}>
            {services.map((service) => {
              const IconComponent = service.icon;
              return (
                <TouchableOpacity
                  key={service.id}
                  style={styles.serviceCard}
                  onPress={() => handleServicePress(service.route)}
                  activeOpacity={0.8}
                >
                  <View style={[styles.serviceIconContainer, { backgroundColor: service.bgColor }]}>
                    <IconComponent size={32} color={service.color} />
                  </View>
                  <Text style={styles.serviceTitle}>{service.title}</Text>
                  <Text style={styles.serviceDescription}>{service.description}</Text>
                  <View style={styles.serviceArrow}>
                    <ChevronRight size={16} color={Colors.neutral[400]} />
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Recent Orders */}
        <View style={styles.recentSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Orders</Text>
            <TouchableOpacity onPress={() => router.push('/orders')}>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.recentOrderCard}>
            <View style={styles.recentOrderInfo}>
              <Text style={styles.recentOrderTitle}>Daily Milk Subscription</Text>
              <Text style={styles.recentOrderDescription}>2L Cow Milk • Delivered Today</Text>
              <Text style={styles.recentOrderStatus}>Delivered</Text>
            </View>
            <View style={styles.recentOrderAmount}>
              <Text style={styles.recentOrderPrice}>₹60</Text>
            </View>
          </View>
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
  scrollContent: {
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  greeting: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: Colors.neutral[900],
    marginBottom: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  location: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: Colors.neutral[600],
    marginLeft: 4,
  },
  notificationButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  heroSection: {
    marginHorizontal: 20,
    marginBottom: 32,
    borderRadius: 16,
    overflow: 'hidden',
  },
  heroImage: {
    width: '100%',
    height: 160,
  },
  heroOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
  },
  heroTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: Colors.white,
    marginBottom: 4,
  },
  heroSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: Colors.white,
    opacity: 0.9,
  },
  servicesSection: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: Colors.neutral[900],
    marginBottom: 16,
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  serviceCard: {
    width: '48%',
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
    position: 'relative',
  },
  serviceIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  serviceTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: Colors.neutral[900],
    marginBottom: 4,
  },
  serviceDescription: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: Colors.neutral[600],
    lineHeight: 16,
  },
  serviceArrow: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
  recentSection: {
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  viewAllText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: Colors.primary[600],
  },
  recentOrderCard: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 1,
  },
  recentOrderInfo: {
    flex: 1,
  },
  recentOrderTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: Colors.neutral[900],
    marginBottom: 4,
  },
  recentOrderDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: Colors.neutral[600],
    marginBottom: 4,
  },
  recentOrderStatus: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: Colors.success[600],
  },
  recentOrderAmount: {
    alignItems: 'flex-end',
  },
  recentOrderPrice: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: Colors.neutral[900],
  },
});