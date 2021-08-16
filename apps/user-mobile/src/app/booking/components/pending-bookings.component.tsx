import { BookingDTO } from '@seekNseat/contracts/booking';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { ListItem } from 'react-native-elements';

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
  text: {
    fontSize: 18,
    textAlign: 'center',
  },
});

type Props = {
  pendingBookings: BookingDTO[];
};

export const PendingBookings = (props: Props) => {
  const [pendingBookings, setPendingBookings] = useState<BookingDTO[]>(
    props.pendingBookings
  );
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
            <ListItem.Content>
              <ListItem.Title
                style={{
                  fontSize: 20,
                  margin: 5,
                  alignSelf: 'center',
                  fontWeight: 'bold',
                }}
              >
                {booking.businessName}
              </ListItem.Title>
              <ListItem.Title
                style={{
                  fontSize: 20,
                  marginTop: 5,
                  alignSelf: 'center',
                }}
              >
                Mesa de: {booking.numberOfFoodies} - Hora:{' '}
                {booking.time.toString().slice(11, -8)}
              </ListItem.Title>
              <ListItem.Title
                style={{
                  fontSize: 18,
                  margin: 10,
                  color: 'grey',
                  alignSelf: 'center',
                  textAlign: 'justify',
                }}
              >
                En pocos segundos se le notificará la respuesta
              </ListItem.Title>
              <ListItem.Title style={{ fontSize: 16 }}></ListItem.Title>
            </ListItem.Content>
          </ListItem>
        ))}
      </ScrollView>
    </View>
  ) : (
    <Text style={styles.text}> No hay solicitudes en lista de espera </Text>
  );
};
