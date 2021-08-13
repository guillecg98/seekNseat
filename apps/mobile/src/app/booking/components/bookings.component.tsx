import { States } from '@seekNseat/contracts';
import { BookingDTO } from '@seekNseat/contracts/booking';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { ListItem } from 'react-native-elements';

import { acceptBooking, declineBooking } from '../requests';
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
});

type Props = {
  bookings: BookingDTO[];
  state: string;
};

const onPressAcceptBooking = (booking: BookingDTO) => {
  acceptBooking(booking._id, 'ACCEPTED', booking.noShow).then((res) =>
    console.log(res?.data)
  );
};

const onPressDeclineBooking = (booking: BookingDTO) => {
  declineBooking(booking._id, 'DECLINED', booking.noShow).then((res) =>
    console.log(res?.data)
  );
};

export const Bookings = (props: Props) => {
  return (
    <View style={styles.listContainer}>
      <ScrollView style={styles.list}>
        {props.bookings.map((booking) => {
          switch (props.state) {
            case States.Accepted:
              return (
                <ListItem
                  key={booking._id}
                  style={styles.listItem}
                  containerStyle={{ borderRadius: 12 }}
                >
                  <ListItem.Content>
                    <BookingActionButton
                      disabled={true}
                      text="Aceptar"
                      color="#0D8686"
                      onPress={() => onPressAcceptBooking(booking)}
                    />
                  </ListItem.Content>
                  <ListItem.Content style={{ margin: 5 }}>
                    <ListItem.Title>
                      {' '}
                      Nombre: {booking.username}{' '}
                    </ListItem.Title>
                    <ListItem.Title>
                      {' '}
                      Mesa para: {booking.numberOfFoodies}{' '}
                    </ListItem.Title>
                    {booking.noShow ? (
                      <ListItem.Title style={styles.noShow}>
                        {' '}
                        No Show{' '}
                      </ListItem.Title>
                    ) : null}
                  </ListItem.Content>
                  <ListItem.Content>
                    <BookingActionButton
                      disabled={false}
                      text={'NoShow'}
                      color="#d17979"
                      onPress={() => onPressDeclineBooking(booking)}
                    />
                  </ListItem.Content>
                </ListItem>
              );
              break;
            case States.Pending:
              return (
                <ListItem
                  key={booking._id}
                  style={styles.listItem}
                  containerStyle={{ borderRadius: 12 }}
                >
                  <ListItem.Content>
                    <BookingActionButton
                      disabled={false}
                      text="Aceptar"
                      color="#0D8686"
                      onPress={() => onPressAcceptBooking(booking)}
                    />
                  </ListItem.Content>
                  <ListItem.Content style={{ margin: 5 }}>
                    <ListItem.Title style={{textAlign:  'center'}}>
                      Nombre: {booking.username}
                    </ListItem.Title>
                    <ListItem.Title style={{textAlign:  'center'}}>
                      Mesa para: {booking.numberOfFoodies}{' '}
                    </ListItem.Title>
                    {booking.noShow ? (
                      <ListItem.Title style={styles.noShow}>
                        {' '}
                        No Show{' '}
                      </ListItem.Title>
                    ) : null}
                  </ListItem.Content>
                  <ListItem.Content>
                    <BookingActionButton
                      disabled={false}
                      text={'En cola'}
                      color="#d17979"
                      onPress={() => onPressDeclineBooking(booking)}
                    />
                  </ListItem.Content>
                </ListItem>
              );
              break;
            case States.Declined:
              return (
                <ListItem
                  key={booking._id}
                  style={styles.listItem}
                  containerStyle={{ borderRadius: 12 }}
                >
                  <ListItem.Content>
                    <BookingActionButton
                      disabled={false}
                      text="Aceptar"
                      color="#0D8686"
                      onPress={() => onPressAcceptBooking(booking)}
                    />
                  </ListItem.Content>
                  <ListItem.Content style={{ margin: 5 }}>
                    <ListItem.Title>
                      {' '}
                      Nombre: {booking.username}{' '}
                    </ListItem.Title>
                    <ListItem.Title>
                      {' '}
                      Mesa para: {booking.numberOfFoodies}{' '}
                    </ListItem.Title>
                    {booking.noShow ? (
                      <ListItem.Title style={styles.noShow}>
                        {' '}
                        No Show{' '}
                      </ListItem.Title>
                    ) : null}
                  </ListItem.Content>
                  <ListItem.Content>
                    <BookingActionButton
                      disabled={true}
                      text={'No show'}
                      color="#d17979"
                      onPress={() => onPressDeclineBooking(booking)}
                    />
                  </ListItem.Content>
                </ListItem>
              );
              break;
            case States.CanceledByUser:
              return (
                <ListItem
                  key={booking._id}
                  style={styles.listItem}
                  containerStyle={{ borderRadius: 12 }}
                >
                  <ListItem.Content style={{ margin: 5 }}>
                    <ListItem.Title>
                      {' '}
                      Nombre: {booking.username}{' '}
                    </ListItem.Title>
                    <ListItem.Title>
                      {' '}
                      Mesa para: {booking.numberOfFoodies}{' '}
                    </ListItem.Title>
                    {booking.noShow ? (
                      <ListItem.Title style={styles.noShow}>
                        {' '}
                        No Show{' '}
                      </ListItem.Title>
                    ) : null}
                  </ListItem.Content>
                  <ListItem.Content>
                    <BookingActionButton
                      disabled={false}
                      text={'Eliminar'}
                      color="#d17979"
                      onPress={() => onPressDeclineBooking(booking)}
                    />
                    <BookingActionButton
                      disabled={false}
                      text="Nueva"
                      color="#0D8686"
                      onPress={() => onPressAcceptBooking(booking)}
                    />
                  </ListItem.Content>
                </ListItem>
              );
              break;

            default:
              return null;
              break;
          }
        })}
      </ScrollView>
    </View>
  );
};
