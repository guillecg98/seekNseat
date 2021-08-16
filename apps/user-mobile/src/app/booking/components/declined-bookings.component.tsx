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

interface Props {
  declinedBookings: BookingDTO[];
}

export const DeclinedBookings = (props: Props) => {
  const [declinedBookings, setDeclinedBookings] = useState<BookingDTO[]>(
    props.declinedBookings
  );

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
            <ListItem.Content>
              <ListItem.Title
                style={{ alignSelf: 'center', fontSize: 20, margin: 5 }}
              >
                Lo Sentimos,
              </ListItem.Title>

              <ListItem.Title
                style={{ margin: 5, textAlign: 'justify', alignSelf: 'center' }}
              >
                <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
                  {booking.businessName}
                </Text>{' '}
                <Text style={{ fontSize: 18 }}>
                  {' '}
                  está lleno en estos momentos y ha puesto tu solicitud en lista
                  de espera{' '}
                </Text>
              </ListItem.Title>
              <ListItem.Title
                style={{
                  alignSelf: 'center',
                  textAlign: 'justify',
                  fontSize: 18,
                  margin: 5,
                }}
              >
                Se te notificará si en los proximos minutos queda alguna mesa
                libre
              </ListItem.Title>
            </ListItem.Content>
          </ListItem>
        ))}
      </ScrollView>
    </View>
  ) : (
    <Text style={styles.text}> No hay solicitudes en lista de espera </Text>
  );
};
