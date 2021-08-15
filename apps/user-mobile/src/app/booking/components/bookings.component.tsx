import { States } from '@seekNseat/contracts';
import { BookingDTO } from '@seekNseat/contracts/booking';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
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
    elevation: 5,
    padding: 5,
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
        {props.bookings.map((booking) => {
          switch (props.state) {
            case States.Pending:
              return (
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
                    <ListItem.Title style={{ fontSize: 16, margin: 5 }}>
                      Tu solicitud al restaurante:
                    </ListItem.Title>
                    <ListItem.Title
                      style={{ fontSize: 18, margin: 5, alignSelf: 'center' }}
                    >
                      "TGB" (hc)
                    </ListItem.Title>
                    <ListItem.Title
                      style={{
                        fontSize: 18,
                        marginTop: 5,
                        alignSelf: 'center',
                      }}
                    >
                      Mesa para: {booking.numberOfFoodies} - Hora: 21:30 (hc)
                    </ListItem.Title>
                    <ListItem.Title
                      style={{ fontSize: 16, margin: 5, color: 'grey' }}
                    >
                      En pocos segundos se le notificará la respuesta
                    </ListItem.Title>
                    <ListItem.Title style={{ fontSize: 16 }}></ListItem.Title>
                  </ListItem.Content>
                </ListItem>
              );
              break;
            case States.Declined:
              return (
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
                    <ListItem.Title style={{ fontSize: 16, margin: 5 }}>
                      El restaurante
                    </ListItem.Title>
                    <ListItem.Title
                      style={{ fontSize: 18, margin: 5, alignSelf: 'center' }}
                    >
                      "TGB" (hc)
                    </ListItem.Title>
                    <ListItem.Title style={{ fontSize: 16, margin: 5 }}>
                      está lleno en estos momentos y ha puesto tu solicitud en
                      lista de espera
                    </ListItem.Title>
                    <ListItem.Title style={{ fontSize: 16, margin: 5 }}>
                      Se te notificará en cuanto se quede una mesa libre de las
                      mismas caracteristicas de tu solicitud!
                    </ListItem.Title>
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
