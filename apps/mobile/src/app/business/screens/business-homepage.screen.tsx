import { States } from '@seekNseat/contracts';
import { BookingDTO } from '@seekNseat/contracts/booking';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import { BasicInfoCard } from '../../booking/components';
import { getBookings } from '../../booking/requests';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  sectionHeader: {
    height: 200,
    backgroundColor: '#FFC074',
    padding: 40,
  },
  textHeader: {
    fontSize: 35,
    color: '#212424',
    textAlign: 'center',
  },
  section: {
    flex: 4,
    padding: 10,
  },
  activityIndicatorContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
});

export const BusinessHomePageScreen = () => {
  const [bookings, setBookings] = useState<BookingDTO[]>();

  useEffect(() => {
    getBookings('df6271d8-fe57-4d46-b7a7-2961373f6021').then((res) => {
      setBookings(res?.data);
    });
  }, []);

  const canceledBookings: BookingDTO[] = bookings.reduce(function (
    result,
    booking
  ) {
    if (booking.bookingState === States.CanceledByUser) { // Change PENDING by States.CanceledByUser when implemented in backend
      result.push(booking);
    }
    return result;
  },
  []);

  return bookings ? (
    <View style={styles.container}>
      <View style={styles.sectionHeader}>
        <Text style={styles.textHeader}> Welcome back, username! </Text>
      </View>

      <View style={styles.section}>
        <BasicInfoCard bookings={canceledBookings} />
      </View>
    </View>
  ) : (
    <View style={styles.activityIndicatorContainer}>
      <ActivityIndicator animating={true} size="large" color="#FFC074" />
    </View>
  );
};
