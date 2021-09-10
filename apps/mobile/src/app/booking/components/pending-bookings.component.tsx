import { BookingDTO } from '@seekNseat/contracts/booking';
import React, { useContext, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { ListItem } from 'react-native-elements';

import { AuthContext } from '../../auth/navigation';
import { States } from '../../utils';
import { acceptBooking, declineBooking, getUser } from '../requests';
import { BookingActionButton } from './booking-action-button.component';

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
  },
  list: {
    flex: 1,
    padding: 5,
  },
  listItem: {
    padding: 2,
  },
  noShow: {
    textAlign: 'center',
    fontSize: 18,
    color: 'red',
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
  },
});

type Props = {
  pendingBookings: BookingDTO[];
};

export const PendingBookings = (props: Props) => {
  const { bearerToken } = useContext(AuthContext);
  const [pendingBookings, setPendingBookings] = useState<BookingDTO[]>(
    props.pendingBookings
  );

  const onPressAcceptBooking = (booking: BookingDTO) => {
    acceptBooking(booking._id, States.Accepted, bearerToken).then((res) => {
      setPendingBookings(
        pendingBookings.filter(
          (pendingBooking) => pendingBooking._id !== booking._id
        )
      );
    });
  };

  const onPressDeclineBooking = (booking: BookingDTO) => {
    declineBooking(booking._id, States.Declined, bearerToken).then((res) => {
      setPendingBookings(
        pendingBookings.filter(
          (pendingBooking) => pendingBooking._id !== booking._id
        )
      );
    });
  };

  return pendingBookings.length !== 0 ? (
    <View style={styles.listContainer}>
      <ScrollView style={styles.list}>
        {pendingBookings.map((booking) => (
          <ListItem
            key={booking._id}
            style={styles.listItem}
            containerStyle={{
              borderRadius: 12,
              borderWidth: 2,
              borderColor: '#ececec',
            }}
          >
            <ListItem.Content style={{ alignItems: 'center' }}>
              <ListItem.Title> Nombre: {booking.username} </ListItem.Title>
              <View style={{ flexDirection: 'row' }}>
                <ListItem.Title>
                  {' '}
                  Mesa para: {booking.numberOfFoodies}{' '}
                </ListItem.Title>
                <ListItem.Title>
                  {' '}
                  Hora: {booking.time.toString().slice(11, -8)}{' '}
                </ListItem.Title>
              </View>
              {getUser(booking.userId, bearerToken).then((res) => res.data.noShow) ? (
                <ListItem.Title style={styles.noShow}> No Show </ListItem.Title>
                // null
              ) : null}
              <View style={{ marginTop: 10, flexDirection: 'row' }}>
                <BookingActionButton
                  disabled={false}
                  text="Aceptar"
                  color="#0D8686"
                  onPress={() => onPressAcceptBooking(booking)}
                />
                <BookingActionButton
                  disabled={false}
                  text={'En cola'}
                  color="#d17979"
                  onPress={() => onPressDeclineBooking(booking)}
                />
              </View>
            </ListItem.Content>
          </ListItem>
        ))}
      </ScrollView>
    </View>
  ) : (
    <Text style={styles.text}> No hay solicitudes pendientes </Text>
  );
};
