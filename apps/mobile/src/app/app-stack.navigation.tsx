import { BookingDTO } from '@seekNseat/contracts/booking';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { BottomNavigation } from 'react-native-paper';

import { getBookings } from './booking/requests';
import { BusinessBookingsScreen } from './booking/screens';
import {
  BusinessHomePageScreen,
  BusinessProfileScreen,
} from './business/screens';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

export const AppStack = () => {
  const [index, setIndex] = useState(1);
  const [routes] = useState([
    { key: 'BOOKINGS', title: 'Reservas', icon: 'book' },
    { key: 'HOME', title: 'Home', icon: 'home' },
    { key: 'PROFILE', title: 'Perfil', icon: 'account-box' },
  ]);
  const [bookings, setBookings] = useState<BookingDTO[]>([]);

  useEffect(() => {
    getBookings('9b584fcb-86f4-4c96-8da1-6495397b9943').then((res) => {
      setBookings(res.data);
    });
  }, [index]);

  if (bookings) {
    const renderScene = ({ route }) => {
      switch (route.key) {
        case 'BOOKINGS':
          return <BusinessBookingsScreen bookings={bookings} />;
          break;
        case 'HOME':
          return <BusinessHomePageScreen bookings={bookings} />;
          break;
        case 'PROFILE':
          return <BusinessProfileScreen />;
          break;

        default:
          return null;
          break;
      }
    };
    return (
      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
        barStyle={{ padding: 7, backgroundColor: '#FFC074' }}
      />
    );
  } else {
    return (
      <View style={styles.container}>
        <ActivityIndicator animating={true} size="large" color="#FFC074" />
      </View>
    );
  }
};
