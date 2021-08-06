import { BookingDTO } from '@seekNseat/contracts/booking';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { TabBar, TabView } from 'react-native-tab-view';

import { BlockReservationsButton, Bookings } from '../components';
import { getBookings } from '../requests';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  header: {
    flex: 1,
  },
  tabView: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
  },
});

const renderTabBar = (props) => (
  <TabBar
    {...props}
    renderIcon={({ route }) => {
      switch (route.key) {
        case 'ACCEPTED':
          return (
            <Icon
              name="checkmark-circle-outline"
              type="ionicon"
              color="#4db356"
            />
          );
        case 'PENDING':
          return <Icon name="timer" type="ionicon" />;
        case 'DECLINED':
          return <Icon name="flame" type="ionicon" color="#d17979" />;
        default:
          return null;
      }
    }}
    indicatorStyle={{ height: 3, backgroundColor: '#4b5173' }}
    style={{ backgroundColor: '#babbc2' }}
    labelStyle={{ color: '#46474f', fontSize: 18, textTransform: 'capitalize' }}
  />
);

export const BusinessBookingsScreen = () => {
  const [bookings, setBookings] = useState<BookingDTO[]>();
  const [index, setIndex] = useState(1);
  const [routes] = useState([
    { key: 'ACCEPTED', title: 'Aceptadas' },
    { key: 'PENDING', title: 'Pendientes' },
    { key: 'DECLINED', title: 'En Cola' },
  ]);

  useEffect(() => {
    getBookings('b6bf988a-f34e-4c4a-bdb6-aa3be8f580f3').then((res) => {
      setBookings(res?.data);
    });
  }, [index]);

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

    const renderScene = ({ route }) => {
      switch (route.key) {
        case 'ACCEPTED':
          return accepted.length ? (
            <View style={styles.tabView}>
              <Bookings bookings={accepted} state="ACCEPTED" />
            </View>
          ) : (
            <View style={styles.tabView}>
              <Text style={styles.text}> No hay solicitudes aceptadas </Text>
            </View>
          );
        case 'PENDING':
          return pending.length ? (
            <View style={styles.tabView}>
              <Bookings bookings={pending} state="PENDING" />
            </View>
          ) : (
            <View style={styles.tabView}>
              <Text style={styles.text}> No hay solicitudes pendientes </Text>
            </View>
          );
        case 'DECLINED':
          return declined.length ? (
            <View style={styles.tabView}>
              <Bookings bookings={declined} state="DECLINED" />
            </View>
          ) : (
            <View style={styles.tabView}>
              <Text style={styles.text}> No hay solicitudes en cola </Text>
            </View>
          );
        default:
          return null;
      }
    };

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TabView
            renderTabBar={renderTabBar}
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
          />
        </View>
        <BlockReservationsButton onPress={() => console.log('blocked')} />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <ActivityIndicator animating={true} size="large" color="#4884CA" />
      </View>
    );
  }
};
