import { BookingDTO } from '@seekNseat/contracts/booking';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { ListItem } from 'react-native-elements';

import { States } from '../../utils';
import { acceptBooking } from '../requests';
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
    color: 'red',
    fontSize: 18,
    textAlign: 'center',
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
  },
});

interface Props {
  declinedBookings: BookingDTO[];
}

export const DeclinedBookings = (props: Props) => {
  const [declinedBookings, setDeclinedBookings] = useState<BookingDTO[]>(
    props.declinedBookings
  );

  const onPressAcceptBooking = (booking: BookingDTO) => {
    acceptBooking(booking._id, States.Accepted, false).then((res) => {
      setDeclinedBookings(
        declinedBookings.filter(
          (declinedBooking) => declinedBooking._id !== booking._id
        )
      );
    });
  };

  return declinedBookings.length !== 0 ? (
    <View style={styles.listContainer}>
      <ScrollView style={styles.list}>
        {declinedBookings.map((booking) => (
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
              {booking.noShow ? (
                <ListItem.Title style={styles.noShow}> No Show </ListItem.Title>
              ) : null}
              <View style={{ marginTop: 10, flexDirection: 'row' }}>
                <BookingActionButton
                  disabled={false}
                  text="Aceptar"
                  color="#0D8686"
                  onPress={() => onPressAcceptBooking(booking)}
                />
                <BookingActionButton
                  disabled={true}
                  text={'En cola'}
                  color="#d17979"
                  onPress={() => console.warn('disabled')}
                />
              </View>
            </ListItem.Content>
          </ListItem>
        ))}
      </ScrollView>
    </View>
  ) : (
    <Text style={styles.text}> No hay solicitudes en cola </Text>
  );
};
