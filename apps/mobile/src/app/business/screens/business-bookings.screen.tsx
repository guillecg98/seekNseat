import { BookingDTO } from '@seekNseat/contracts/booking';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { TabView } from 'react-native-elements';
import { Tab } from 'react-native-elements/dist/tab/Tab';

import { Bookings } from '../components';
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

export const BusinessBookingsScreen = ({ navigation }) => {
  const [bookings, setBookings] = useState<BookingDTO[]>();
  const [index, setIndex] = useState(1);

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

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Tab
            value={index}
            onChange={setIndex}
            indicatorStyle={{ height: 3, backgroundColor: '#4b5173' }}
          >
            <Tab.Item
              title="Aceptadas"
              titleStyle={{ fontSize: 12, color: '#4db356' }}
              icon={{
                name: 'checkmark-circle-outline',
                type: 'ionicon',
                color: '#4db356',
              }}
            />
            <Tab.Item
              title="Pendientes"
              titleStyle={{ fontSize: 13 }}
              icon={{ name: 'timer', type: 'ionicon' }}
            />
            <Tab.Item
              title="En Cola"
              titleStyle={{ fontSize: 12, color: '#d17979' }}
              icon={{
                name: 'flame',
                type: 'ionicon',
                color: '#d17979',
              }}
            />
          </Tab>
        </View>

        <View style={styles.body}>
          <TabView animationType="timing" value={index} onChange={setIndex}>
            <TabView.Item style={styles.tabView}>
              <Bookings bookings={accepted} state="ACCEPTED" />
            </TabView.Item>

            <TabView.Item style={styles.tabView}>
              <Bookings bookings={pending} state="PENDING" />
            </TabView.Item>

            <TabView.Item style={styles.tabView}>
              <Bookings bookings={declined} state="DECLINED" />
            </TabView.Item>
          </TabView>
        </View>
        <Text> Footer </Text>
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
