import { BookingDTO } from '@seekNseat/contracts/booking';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { ListItem } from 'react-native-elements';

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
    elevation: 3,
    padding: 2,
  },
});

type Props = {
  bookings: BookingDTO[];
  state: string;
};

export const Bookings = (props: Props) => {
  return (
    <View style={styles.listContainer}>
      <ScrollView style={styles.list}>
        {props.bookings.map((booking) => (
          <ListItem
            key={booking._id}
            style={styles.listItem}
            containerStyle={{ borderRadius: 12 }}
          >
            <ListItem.Content>
              <BookingActionButton
                disabled={props.state === 'ACCEPTED' ? true : false}
                text="Aceptar"
                color="#4db356"
                onPress={() => console.log('reserva aceptada')}
              />
            </ListItem.Content>

            <ListItem.Content style={{ margin: 5 }}>
              <ListItem.Title> Nombre: {booking.bookingState} </ListItem.Title>
              <ListItem.Title>
                {' '}
                Mesa para: {booking.numberOfFoodies}{' '}
              </ListItem.Title>
              {booking.noShow ? (
                <ListItem.Title style={{textAlign: 'center', fontSize: 18, color: 'red'}}> No Show </ListItem.Title>
              ) : (
                <ListItem.Title> Ta bien </ListItem.Title>
              )}
            </ListItem.Content>

            <ListItem.Content>
              <BookingActionButton
                disabled={props.state === 'DECLINED' ? true : false}
                text={props.state === 'ACCEPTED' ? "NoShow" : "En cola"}
                color="#d17979"
                onPress={() => console.log('reserva a la cola')}
              />
            </ListItem.Content>
          </ListItem>
        ))}
      </ScrollView>
    </View>
  );
};
