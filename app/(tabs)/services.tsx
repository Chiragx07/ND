import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Colors } from '@/constants/colors';
import { 
  Milk, 
  Droplets, 
  Apple, 
  Sparkles, 
  ChevronRight,
  Search 
} from 'lucide-react-native';

const serviceCategories = [
  {
    id: 'milk',
    title: 'Milk Delivery',
    description: 'Fresh milk delivered to your doorstep daily',
    icon: Milk,
    color: Colors.primary[600],
    bgColor: Colors.primary[50],
    vendors: 12,
    route: '/services/milk',
  },
  {
    id: 'water',
    title: 'Water Delivery',
    description: 'Pure drinking water, 20L jars and RO service',
    icon: Droplets,
    color: Colors.secondary[600],
    bgColor: Colors.secondary[50],
    vendors: 8,
    route: '/services/water',
  },
  {
    id: 'fruits',
    title: 'Fruits & Vegetables',
    description: 'Fresh produce and custom baskets',
    icon: Apple,
    color: Colors.accent[600],
    bgColor: Colors.accent[50],
    vendors: 15,
    route: '/services/fruits',
  },
  {
    id: 'maid',
    title: 'Maid Services',
    description: 'Professional cleaning and cooking services',
    icon: Sparkles,
    color: Colors.neutral[700],
    bgColor: Colors.neutral[100],
    vendors: 25,
    route: '/services/maid',
  },
];

export default function ServicesScreen() {
  const handleServicePress = (route: string) => {
    router.push(route as any);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Services</Text>
        <TouchableOpacity style={styles.searchButton}>
          <Search size={24} color={Colors.neutral[600]} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.subtitle}>Choose from our trusted local service providers</Text>

        <View style={styles.categoriesContainer}>
          {serviceCategories.map((category) => {
            const IconComponent = category.icon;
            return (
              <TouchableOpacity
                key={category.id}
                style={styles.categoryCard}
                onPress={() => handleServicePress(category.route)}
                activeOpacity={0.8}
              >
                <View style={styles.categoryContent}>
                  <View style={[styles.iconContainer, { backgroundColor: category.bgColor }]}>
                    <IconComponent size={28} color={category.color} />
                  </View>
                  
                  <View style={styles.categoryInfo}>
                    <Text style={styles.categoryTitle}>{category.title}</Text>
                    <Text style={styles.categoryDescription}>{category.description}</Text>
                    <Text style={styles.vendorCount}>{category.vendors} vendors available</Text>
                  </View>
                </View>
                
                <ChevronRight size={20} color={Colors.neutral[400]} />
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.featuresSection}>
          <Text style={styles.sectionTitle}>Why Choose NextDoor?</Text>
          
          <View style={styles.featuresList}>
            <View style={styles.featureItem}>
              <View style={styles.featureDot} />
              <Text style={styles.featureText}>Verified local vendors</Text>
            </View>
            <View style={styles.featureItem}>
              <View style={styles.featureDot} />
              <Text style={styles.featureText}>Flexible scheduling</Text>
            </View>
            <View style={styles.featureItem}>
              <View style={styles.featureDot} />
              <Text style={styles.featureText}>Secure payments</Text>
            </View>
            <View style={styles.featureItem}>
              <View style={styles.featureDot} />
              <Text style={styles.featureText}>Real-time tracking</Text>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: Colors.neutral[900],
  },
  searchButton: {
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
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: Colors.neutral[600],
    marginBottom: 24,
    lineHeight: 24,
  },
  categoriesContainer: {
    marginBottom: 32,
  },
  categoryCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  categoryContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  categoryInfo: {
    flex: 1,
  },
  categoryTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: Colors.neutral[900],
    marginBottom: 4,
  },
  categoryDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: Colors.neutral[600],
    marginBottom: 4,
    lineHeight: 20,
  },
  vendorCount: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: Colors.primary[600],
  },
  featuresSection: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 20,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: Colors.neutral[900],
    marginBottom: 16,
  },
  featuresList: {
    gap: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featureDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary[600],
    marginRight: 12,
  },
  featureText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: Colors.neutral[700],
  },
});