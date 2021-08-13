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

  if (bookings) {
    const accepted: BookingDTO[] = bookings.reduce(function (result, booking) {
      if (booking.bookingState === States.Accepted) {
        result.push(booking);
      }
      return result;
    }, []);

    const pending: BookingDTO[] = bookings.reduce(function (result, booking) {
      if (booking.bookingState === States.Pending) {
        result.push(booking);
      }
      return result;
    }, []);

    const declined: BookingDTO[] = bookings.reduce(function (result, booking) {
      if (booking.bookingState === States.Declined) {
        result.push(booking);
      }
      return result;
    }, []);

    const canceled: BookingDTO[] = bookings.reduce(function (result, booking) {
      if (booking.bookingState === States.CanceledByUser) {
        result.push(booking);
      }
      return result;
    }, []);

    return (
      <View style={styles.container}>
        <View style={styles.sectionHeader}>
          <Text style={styles.textHeader}> Welcome back, username! </Text>
        </View>

        <View style={styles.section}>
          <BasicInfoCard
            acceptedBookings={accepted}
            pendingBookings={pending}
            declinedBookings={declined}
            canceledBookings={canceled}
          />
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.activityIndicatorContainer}>
        <ActivityIndicator animating={true} size="large" color="#FFC074" />
      </View>
    );
  }
};
