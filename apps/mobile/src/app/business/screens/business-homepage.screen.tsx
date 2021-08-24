import { BookingDTO } from '@seekNseat/contracts/booking';
import React, { useContext, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Provider } from 'react-native-paper';

import { AuthContext } from '../../auth/navigation';
import { BasicInfoCard } from '../../booking/components';
import { getBookings } from '../../booking/requests';
import { States } from '../../utils';

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
    color: '#2b2b2b',
    fontWeight: 'bold',
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

interface Props {
  bookings: BookingDTO[];
}

export const BusinessHomePageScreen = (props: Props) => {
  const { user } = useContext(AuthContext);

  if (props.bookings) {
    const acceptedBookings = props.bookings.filter(
      (booking) => booking.bookingState === States.Accepted
    ).length;
    const pendingBookings = props.bookings.filter(
      (booking) => booking.bookingState === States.Pending
    ).length;
    const declinedBookings = props.bookings.filter(
      (booking) => booking.bookingState === States.Declined
    ).length;
    const canceledBookings: BookingDTO[] = props.bookings.filter(
      (booking) => booking.bookingState === States.CanceledByUser
    );

    return (
      <Provider>
        <ScrollView style={styles.container}>
          <View style={styles.sectionHeader}>
            <Text style={styles.textHeader}>
              {' '}
              Bienvenido de nuevo, {user.givenName}!{' '}
            </Text>
          </View>

          <View style={styles.section}>
            <BasicInfoCard
              acceptedBookings={acceptedBookings}
              pendingBookings={pendingBookings}
              declinedBookings={declinedBookings}
              canceledBookings={canceledBookings}
            />
          </View>
        </ScrollView>
      </Provider>
    );
  } else {
    return (
      <View style={styles.activityIndicatorContainer}>
        <ActivityIndicator animating={true} size="large" color="#FFC074" />
      </View>
    );
  }
};
