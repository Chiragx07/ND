import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import { Calendar } from 'react-native-calendars';
import { Colors } from '@/constants/colors';

const MAID_PRICES: Record<string, number> = {
  '1': 400,
  '2': 500,
  '3': 300,
};

function getMarkedDates(start: string, end: string) {
  if (!start) return {};
  let marked: any = { [start]: { startingDay: true, color: Colors.accent[600], textColor: '#fff' } };
  if (!end || start === end) return marked;
  let curr = new Date(start);
  const endDate = new Date(end);
  while (curr < endDate) {
    curr.setDate(curr.getDate() + 1);
    const d = curr.toISOString().split('T')[0];
    if (d === end) {
      marked[d] = { endingDay: true, color: Colors.accent[600], textColor: '#fff' };
    } else {
      marked[d] = { color: Colors.accent[200], textColor: Colors.accent[700] };
    }
  }
  return marked;
}

export default function MaidBookingScreen() {
  const { vendorId } = useLocalSearchParams<{ vendorId: string }>();
  const [range, setRange] = useState<{ start: string; end: string }>({ start: '', end: '' });

  const onDayPress = (day: any) => {
    if (!range.start || (range.start && range.end)) {
      setRange({ start: day.dateString, end: '' });
    } else if (new Date(day.dateString) < new Date(range.start)) {
      setRange({ start: day.dateString, end: range.start });
    } else {
      setRange({ ...range, end: day.dateString });
    }
  };

  const handleBook = () => {
    if (!range.start || !range.end) {
      Alert.alert('Select a start and end date');
      return;
    }
    const days =
      Math.ceil(
        (new Date(range.end).getTime() - new Date(range.start).getTime()) /
          (1000 * 60 * 60 * 24)
      ) + 1;
    const pricePerDay = MAID_PRICES[vendorId ?? '1'] || 400;
    const total = days * pricePerDay;
    router.push({
      pathname: '/services/maid/payment',
      params: {
        vendorId,
        start: range.start,
        end: range.end,
        days: days.toString(),
        total: total.toString(),
      },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Select Booking Dates</Text>
      <Calendar
        markingType={'period'}
        markedDates={getMarkedDates(range.start, range.end)}
        onDayPress={onDayPress}
        minDate={new Date().toISOString().split('T')[0]}
        style={styles.calendar}
        theme={{
          selectedDayBackgroundColor: Colors.accent[600],
          todayTextColor: Colors.accent[700],
        }}
      />
      <View style={{ marginTop: 20 }}>
        <Text style={styles.selectedText}>
          {range.start && range.end
            ? `Selected: ${range.start} to ${range.end}`
            : range.start
            ? `Start: ${range.start}`
            : 'No dates selected'}
        </Text>
      </View>
      <TouchableOpacity style={styles.bookButton} onPress={handleBook}>
        <Text style={styles.bookButtonText}>Proceed to Payment</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white, alignItems: 'center' },
  title: { fontSize: 22, fontWeight: 'bold', marginTop: 24, marginBottom: 12 },
  calendar: { borderRadius: 12, elevation: 2, marginBottom: 8, width: 340 },
  selectedText: { fontSize: 16, color: Colors.accent[700], marginBottom: 16 },
  bookButton: {
    backgroundColor: Colors.accent[600],
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 16,
    width: 200,
  },
  bookButtonText: { color: Colors.white, fontSize: 16, fontWeight: 'bold' },
});