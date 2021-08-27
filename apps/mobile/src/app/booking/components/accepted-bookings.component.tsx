import { BookingDTO } from '@seekNseat/contracts/booking';
import React, { useContext, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { ListItem } from 'react-native-elements';

import { AuthContext } from '../../auth/navigation';
import { getUser } from '../requests';
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
  acceptedBookings: BookingDTO[];
}

export const AcceptedBookings = (props: Props) => {
  const { bearerToken } = useContext(AuthContext);
  const [acceptedBookings, setAcceptedBookings] = useState<BookingDTO[]>(
    props.acceptedBookings
  );

  const onPressNoShow = (booking: BookingDTO) => {
    console.log('implementar noshow al usuario de esta reserva');
  };

  return acceptedBookings.length !== 0 ? (
    <View style={styles.listContainer}>
      <ScrollView style={styles.list}>
        {acceptedBookings.map((booking) => (
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
              ) : null}
              <View style={{ marginTop: 10, flexDirection: 'row' }}>
                <BookingActionButton
                  disabled={true}
                  text="Aceptar"
                  color="#0D8686"
                  onPress={() => {
                    console.warn('wip');
                  }}
                />
                <BookingActionButton
                  disabled={false}
                  text={'No Show'}
                  color="#d17979"
                  onPress={() => onPressNoShow(booking)}
                />
              </View>
            </ListItem.Content>
          </ListItem>
        ))}
      </ScrollView>
    </View>
  ) : (
    <Text style={styles.text}> No hay solicitudes aceptadas </Text>
  );
};
