import { BookingDTO } from '@seekNseat/contracts/booking';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { TabBar, TabView } from 'react-native-tab-view';

// import { TabView } from 'react-native-elements';
// import { Tab } from 'react-native-elements/dist/tab/Tab';
import {
  BlockReservationsButton,
  Bookings,
} from '../components';
import { getBookings } from '../requests';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  header: {
    flex: 1,
  },
  body: {
    flex: 8,
  },
  text: {
    textAlign: 'center',
  },
  tabView: {
    flex: 1,
    justifyContent: 'center',
  },
});

const renderTabBar = (props) => (
  <TabBar
    {...props}
    renderIcon={({ route }) => {
      switch(route.key) {
        case 'ACCEPTED':
          return <Icon name='checkmark-circle-outline' type='ionicon' color='#4db356' />
        case 'PENDING':
          return <Icon name='timer' type='ionicon'/>
        case 'DECLINED':
          return <Icon name='flame' type='ionicon' color='#d17979' />
        default:
          return null
      }
    }}
    indicatorStyle={{ height: 3, backgroundColor: '#4b5173' }}
    style={{ backgroundColor: '#babbc2' }}
    labelStyle={{ color: '#46474f', fontSize: 18, textTransform: 'capitalize' }}
  />
);

export const BusinessBookingsScreen = ({ navigation }) => {
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
          return (
            <View style={styles.tabView}>
              <Bookings bookings={accepted} state="ACCEPTED" />
            </View>
          );
        case 'PENDING':
          return (
            <View style={styles.body}>
              <View style={styles.tabView}>
                <Bookings bookings={pending} state="PENDING" />
              </View>
              <BlockReservationsButton onPress={() => console.log('blocked')} />
            </View>
          );
        case 'DECLINED':
          return <Bookings bookings={declined} state="DECLINED" />;
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