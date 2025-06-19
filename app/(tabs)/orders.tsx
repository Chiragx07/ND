import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/colors';
import { Package, Clock, CircleCheck as CheckCircle, Circle as XCircle, Filter } from 'lucide-react-native';

const mockOrders = [
  {
    id: '1',
    vendorName: 'Fresh Dairy Farm',
    serviceName: 'Daily Milk Subscription',
    items: '2L Cow Milk',
    total: 60,
    status: 'delivered',
    date: '2024-01-15T08:00:00Z',
    deliveryDate: '2024-01-15T07:30:00Z',
  },
  {
    id: '2',
    vendorName: 'Pure Water Co.',
    serviceName: 'Water Delivery',
    items: '2x 20L Bisleri Jars',
    total: 120,
    status: 'confirmed',
    date: '2024-01-14T14:30:00Z',
    deliveryDate: '2024-01-16T10:00:00Z',
  },
  {
    id: '3',
    vendorName: 'Green Basket',
    serviceName: 'Fruit & Vegetable',
    items: 'Family Basket (5kg)',
    total: 280,
    status: 'pending',
    date: '2024-01-14T10:15:00Z',
    deliveryDate: '2024-01-17T09:00:00Z',
  },
  {
    id: '4',
    vendorName: 'Clean Home Services',
    serviceName: 'Maid Service',
    items: 'House Cleaning (3 hours)',
    total: 450,
    status: 'cancelled',
    date: '2024-01-13T16:20:00Z',
    deliveryDate: '2024-01-14T14:00:00Z',
  },
];

const statusConfig = {
  pending: { color: Colors.warning[600], bgColor: Colors.warning[500], icon: Clock, label: 'Pending' },
  confirmed: { color: Colors.primary[600], bgColor: Colors.primary[500], icon: Package, label: 'Confirmed' },
  delivered: { color: Colors.success[600], bgColor: Colors.success[500], icon: CheckCircle, label: 'Delivered' },
  cancelled: { color: Colors.error[600], bgColor: Colors.error[500], icon: XCircle, label: 'Cancelled' },
};

export default function OrdersScreen() {
  const [activeTab, setActiveTab] = useState('all');

  const filteredOrders = activeTab === 'all' 
    ? mockOrders 
    : mockOrders.filter(order => order.status === activeTab);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { 
      day: 'numeric', 
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const OrderCard = ({ order }: { order: typeof mockOrders[0] }) => {
    const config = statusConfig[order.status as keyof typeof statusConfig];
    const StatusIcon = config.icon;

    return (
      <View style={styles.orderCard}>
        <View style={styles.orderHeader}>
          <View>
            <Text style={styles.vendorName}>{order.vendorName}</Text>
            <Text style={styles.serviceName}>{order.serviceName}</Text>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: config.bgColor }]}>
            <StatusIcon size={12} color={config.color} />
            <Text style={[styles.statusText, { color: config.color }]}>{config.label}</Text>
          </View>
        </View>

        <View style={styles.orderDetails}>
          <Text style={styles.orderItems}>{order.items}</Text>
          <Text style={styles.orderDate}>Ordered: {formatDate(order.date)}</Text>
          {order.status !== 'cancelled' && (
            <Text style={styles.deliveryDate}>
              {order.status === 'delivered' ? 'Delivered' : 'Expected'}: {formatDate(order.deliveryDate)}
            </Text>
          )}
        </View>

        <View style={styles.orderFooter}>
          <Text style={styles.orderTotal}>₹{order.total}</Text>
          <TouchableOpacity style={styles.orderAction}>
            <Text style={styles.orderActionText}>
              {order.status === 'delivered' ? 'Reorder' : 'View Details'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Orders</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={24} color={Colors.neutral[600]} />
        </TouchableOpacity>
      </View>

      <View style={styles.tabContainer}>
        {['all', 'pending', 'confirmed', 'delivered'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))
        ) : (
          <View style={styles.emptyState}>
            <Package size={48} color={Colors.neutral[400]} />
            <Text style={styles.emptyTitle}>No orders found</Text>
            <Text style={styles.emptyDescription}>
              {activeTab === 'all' 
                ? 'You haven\'t placed any orders yet' 
                : `No ${activeTab} orders found`}
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
  filterButton: {
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
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 8,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.white,
  },
  activeTab: {
    backgroundColor: Colors.primary[600],
  },
  tabText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: Colors.neutral[600],
  },
  activeTabText: {
    color: Colors.white,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  orderCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  vendorName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: Colors.neutral[900],
    marginBottom: 2,
  },
  serviceName: {
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
  statusText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
  },
  orderDetails: {
    marginBottom: 16,
  },
  orderItems: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: Colors.neutral[900],
    marginBottom: 4,
  },
  orderDate: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: Colors.neutral[500],
    marginBottom: 2,
  },
  deliveryDate: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: Colors.neutral[500],
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderTotal: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: Colors.neutral[900],
  },
  orderAction: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: Colors.primary[50],
  },
  orderActionText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: Colors.primary[600],
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