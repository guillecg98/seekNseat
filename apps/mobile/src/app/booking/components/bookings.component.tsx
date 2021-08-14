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
                  <ListItem.Content style={{ alignItems: 'center' }}>
                    <ListItem.Title>
                      {' '}
                      Nombre: {booking.username}{' '}
                    </ListItem.Title>
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
                      <ListItem.Title style={styles.noShow}>
                        {' '}
                        No Show{' '}
                      </ListItem.Title>
                    ) : null}
                    <View style={{ marginTop: 10, flexDirection: 'row' }}>
                      <BookingActionButton
                        disabled={true}
                        text="Aceptar"
                        color="#0D8686"
                        onPress={() => onPressAcceptBooking(booking)}
                      />
                      <BookingActionButton
                        disabled={false}
                        text={'No Show'}
                        color="#d17979"
                        onPress={() => onPressDeclineBooking(booking)}
                      />
                    </View>
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
                  <ListItem.Content style={{ alignItems: 'center' }}>
                    <ListItem.Title>
                      {' '}
                      Nombre: {booking.username}{' '}
                    </ListItem.Title>
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
                      <ListItem.Title style={styles.noShow}>
                        {' '}
                        No Show{' '}
                      </ListItem.Title>
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
              );
              break;
            case States.Declined:
              return (
                <ListItem
                key={booking._id}
                style={styles.listItem}
                containerStyle={{ borderRadius: 12 }}
              >
                <ListItem.Content style={{ alignItems: 'center' }}>
                  <ListItem.Title>
                    {' '}
                    Nombre: {booking.username}{' '}
                  </ListItem.Title>
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
                    <ListItem.Title style={styles.noShow}>
                      {' '}
                      No Show{' '}
                    </ListItem.Title>
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
                      onPress={() => onPressDeclineBooking(booking)}
                    />
                  </View>
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
                  <ListItem.Content style={{ alignItems: 'center' }}>
                  <ListItem.Title>
                      {' '}
                      Nombre: {booking.username}{' '}
                    </ListItem.Title>
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
                      <ListItem.Title style={styles.noShow}>
                        {' '}
                        No Show{' '}
                      </ListItem.Title>
                    ) : null}
                    <View style={{ marginTop: 10, flexDirection: 'row' }}>
                      <BookingActionButton
                        disabled={false}
                        text="Nueva"
                        color="#0D8686"
                        onPress={() => onPressAcceptBooking(booking)}
                      />
                      <BookingActionButton
                        disabled={false}
                        text={'Eliminar'}
                        color="#d17979"
                        onPress={() => onPressDeclineBooking(booking)}
                      />
                    </View>
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
