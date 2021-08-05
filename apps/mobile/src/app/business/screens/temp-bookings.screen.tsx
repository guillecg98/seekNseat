import { BookingDTO } from '@seekNseat/contracts/booking';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { Bookings } from '../components';
import { getBookings } from '../requests';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
},
})

export const TempBookingScreen = ({navigation}) => {
  const [bookings, setBookings] = useState<BookingDTO[]>();

  useEffect(() => {
    getBookings('b6bf988a-f34e-4c4a-bdb6-aa3be8f580f3').then((res) => {
      setBookings(res?.data);
    });
  }, []);

  if (bookings) {
    const accepted: BookingDTO[] = bookings.reduce(function (result, booking) {
      if (booking.bookingState === 'ACCEPTED') {
        result.push(booking);
      }
      return result;
    }, []);

    const pending: BookingDTO[] = bookings.reduce(function (result, booking) {
      if (booking.bookingState === 'PENDING') {
        result.push(booking);
      }
      return result;
    }, []);

    const declined: BookingDTO[] = bookings.reduce(function (result, booking) {
      if (booking.bookingState === 'DECLINED') {
        result.push(booking);
      }
      return result;
    }, []);

  return(
    <View style={{justifyContent: 'center', flex: 1}}>
      <Bookings bookings={pending} state="afds"/>
    </View>
  )
  } else {
    return(
      <View style={styles.container}>
          <ActivityIndicator
              animating={true}
              size='large'
              color='#4884CA' />
      </View>
  )
  }
}