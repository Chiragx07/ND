import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Colors } from '@/constants/colors';
import { User, MapPin, Bell, CreditCard, Settings, CircleHelp as HelpCircle, LogOut, ChevronRight, CreditCard as Edit } from 'lucide-react-native';

const profileData = {
  name: 'Rajesh Kumar',
  email: 'rajesh.kumar@gmail.com',
  phone: '+91 98765 43210',
  address: 'A-301, Green Valley Apartments, HSR Layout, Bangalore - 560102',
  memberSince: 'January 2024',
};

const menuItems = [
  {
    id: 'addresses',
    icon: MapPin,
    title: 'Delivery Addresses',
    subtitle: 'Manage your delivery locations',
    route: '/profile/addresses',
  },
  {
    id: 'notifications',
    icon: Bell,
    title: 'Notifications',
    subtitle: 'Manage notification preferences',
    route: '/profile/notifications',
  },
  {
    id: 'payments',
    icon: CreditCard,
    title: 'Payment Methods',
    subtitle: 'Manage cards and wallets',
    route: '/profile/payments',
  },
  {
    id: 'settings',
    icon: Settings,
    title: 'App Settings',
    subtitle: 'Language, theme, and more',
    route: '/profile/settings',
  },
  {
    id: 'help',
    icon: HelpCircle,
    title: 'Help & Support',
    subtitle: 'FAQs and customer support',
    route: '/profile/help',
  },
];

export default function ProfileScreen() {
  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Logout', 
          style: 'destructive',
          onPress: () => router.replace('/auth/login'),
        },
      ]
    );
  };

  const handleMenuPress = (route: string) => {
    // For now, show an alert since we haven't implemented these screens
    Alert.alert('Coming Soon', 'This feature will be available soon!');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Profile Info */}
        <View style={styles.profileCard}>
          <View style={styles.profileHeader}>
            <View style={styles.avatarContainer}>
              <User size={32} color={Colors.primary[600]} />
            </View>
            <TouchableOpacity style={styles.editButton}>
              <Edit size={20} color={Colors.primary[600]} />
            </TouchableOpacity>
          </View>

          <Text style={styles.profileName}>{profileData.name}</Text>
          <Text style={styles.profileEmail}>{profileData.email}</Text>
          <Text style={styles.profilePhone}>{profileData.phone}</Text>
          
          <View style={styles.addressContainer}>
            <MapPin size={16} color={Colors.neutral[500]} />
            <Text style={styles.profileAddress}>{profileData.address}</Text>
          </View>

          <Text style={styles.memberSince}>Member since {profileData.memberSince}</Text>
        </View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <TouchableOpacity
                key={item.id}
                style={styles.menuItem}
                onPress={() => handleMenuPress(item.route)}
                activeOpacity={0.8}
              >
                <View style={styles.menuItemLeft}>
                  <View style={styles.menuIcon}>
                    <IconComponent size={20} color={Colors.neutral[600]} />
                  </View>
                  <View style={styles.menuItemText}>
                    <Text style={styles.menuItemTitle}>{item.title}</Text>
                    <Text style={styles.menuItemSubtitle}>{item.subtitle}</Text>
                  </View>
                </View>
                <ChevronRight size={20} color={Colors.neutral[400]} />
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout} activeOpacity={0.8}>
          <LogOut size={20} color={Colors.error[600]} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>NextDoor v1.0.0</Text>
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
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: Colors.neutral[900],
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  profileCard: {
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
  profileHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.primary[50],
    justifyContent: 'center',
    alignItems: 'center',
  },
  editButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary[50],
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileName: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: Colors.neutral[900],
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: Colors.neutral[600],
    marginBottom: 4,
  },
  profilePhone: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: Colors.neutral[600],
    marginBottom: 12,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  profileAddress: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: Colors.neutral[600],
    marginLeft: 8,
    flex: 1,
    lineHeight: 20,
  },
  memberSince: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: Colors.primary[600],
  },
  menuContainer: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    marginBottom: 24,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral[100],
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.neutral[50],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuItemText: {
    flex: 1,
  },
  menuItemTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: Colors.neutral[900],
    marginBottom: 2,
  },
  menuItemSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: Colors.neutral[500],
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    borderRadius: 12,
    paddingVertical: 16,
    marginBottom: 32,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
    gap: 8,
  },
  logoutText: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: Colors.error[600],
  },
  footer: {
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: Colors.neutral[400],
  },
});