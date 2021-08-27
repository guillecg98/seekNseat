import { BookingDTO } from '@seekNseat/contracts/booking';
import { BusinessDTO } from '@seekNseat/contracts/business';
import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { TabBar, TabView } from 'react-native-tab-view';

import { AuthContext } from '../../auth/navigation';
import { getBusiness } from '../../business/requests';
import { States } from '../../utils';
import {
  AcceptedBookings,
  BlockBooknigssButton,
  DeclinedBookings,
  PendingBookings,
} from '../components';
import { blockBookings } from '../requests';

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
        case States.Accepted:
          return (
            <Icon
              name="checkmark-circle-outline"
              type="ionicon"
              color="#0D8686"
            />
          );
        case States.Pending:
          return <Icon name="timer" type="ionicon" />;
        case States.Declined:
          return <Icon name="flame" type="ionicon" color="#F27979" />;
        default:
          return null;
      }
    }}
    indicatorStyle={{ height: 3, backgroundColor: '#4b5173' }}
    style={{ backgroundColor: '#babbc2' }}
    labelStyle={{ color: '#46474f', fontSize: 16, textTransform: 'capitalize' }}
  />
);

interface Props {
  bookings: BookingDTO[];
}

export const BusinessBookingsScreen = (props: Props) => {
  const { bearerToken, businessId } = useContext(AuthContext);
  const [blocked, setBlocked] = useState(false);
  const [business, setBusiness] = useState<BusinessDTO>();
  const [index, setIndex] = useState(1);
  const [routes] = useState([
    { key: States.Accepted, title: 'Aceptadas' },
    { key: States.Pending, title: 'Pendientes' },
    { key: States.Declined, title: 'En Cola' },
  ]);

  useEffect(() => {
    getBusiness(businessId, bearerToken).then((res) => {
      setBusiness(res.data);
      setBlocked(res.data.blocked);
    });
  }, [blocked]);

  const onUnlockBookings = () => {
    const unlock = false;
    blockBookings(businessId, unlock, bearerToken);
    setBlocked(unlock);
  };
  const onBlockBookings = () => {
    const block = true;
    blockBookings(businessId, block, bearerToken);
    setBlocked(block);
  };

  if (props.bookings && business) {
    const accepted: BookingDTO[] = props.bookings.filter(
      (booking) => booking.bookingState === States.Accepted
    );
    const pending: BookingDTO[] = props.bookings.filter(
      (booking) => booking.bookingState === States.Pending
    );
    const declined: BookingDTO[] = props.bookings.filter(
      (booking) => booking.bookingState === States.Declined
    );

    const renderScene = ({ route }) => {
      switch (route.key) {
        case States.Accepted:
          return accepted.length !== 0 ? (
            <View style={styles.tabView}>
              <AcceptedBookings acceptedBookings={accepted} />
            </View>
          ) : (
            <View style={styles.tabView}>
              <Text style={styles.text}> No hay solicitudes aceptadas </Text>
            </View>
          );
        case States.Pending:
          return pending.length !== 0 ? (
            <View style={styles.tabView}>
              <PendingBookings pendingBookings={pending} />
            </View>
          ) : (
            <View style={styles.tabView}>
              <Text style={styles.text}> No hay solicitudes pendientes </Text>
            </View>
          );
        case States.Declined:
          return declined.length !== 0 ? (
            <View style={styles.tabView}>
              <DeclinedBookings declinedBookings={declined} />
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
        <BlockBooknigssButton
          blocked={business.blocked}
          onPress={business.blocked ? onUnlockBookings : onBlockBookings}
        />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <ActivityIndicator animating={true} size="large" color="#FFC074" />
      </View>
    );
  }
};
