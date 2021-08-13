import { States } from '@seekNseat/contracts';
import { BookingDTO } from '@seekNseat/contracts/booking';
import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import { Card } from 'react-native-paper';

import { Bookings } from './bookings.component';

const styles = StyleSheet.create({
  container: {
    top: -50,
    margin: 10,
    elevation: 5,
    borderRadius: 20,
    alignSelf: 'center',
    position: 'absolute',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  cardHeaderItem: {
    margin: 7,
    elevation: 5,
    borderRadius: 20,
  },
  cardHeaderItemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cardHeaderItemContent: {
    margin: 5,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cardBodyItemTitle: {
    fontSize: 20,
    margin: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cardBody: {
    padding: 15,
    marginTop: 15,
    justifyContent: 'center',
  },
});

interface Props {
  acceptedBookings: BookingDTO[];
  pendingBookings: BookingDTO[];
  declinedBookings: BookingDTO[];
  canceledBookings: BookingDTO[];
}

export const BasicInfoCard = (props: Props) => {
  return (
    <Card style={styles.container}>
      <Card.Title title="Tus resumen para hoy" />
      <Card.Content style={styles.cardHeader}>
        <Card style={styles.cardHeaderItem}>
          <Icon
            name="checkmark-circle-outline"
            type="ionicon"
            color="#0D8686"
          />
          <Text style={styles.cardHeaderItemTitle}> Aceptadas </Text>
          <Text style={styles.cardHeaderItemContent}>
            {' '}
            {props.acceptedBookings.length}{' '}
          </Text>
        </Card>
        <Card style={styles.cardHeaderItem}>
          <Icon name="timer" type="ionicon" />
          <Text style={styles.cardHeaderItemTitle}> Pendientes </Text>
          <Text style={styles.cardHeaderItemContent}>
            {' '}
            {props.pendingBookings.length}{' '}
          </Text>
        </Card>
        <Card style={styles.cardHeaderItem}>
          <Icon name="flame" type="ionicon" color="#F27979" />
          <Text style={styles.cardHeaderItemTitle}> En cola </Text>
          <Text style={styles.cardHeaderItemContent}>
            {' '}
            {props.declinedBookings.length}{' '}
          </Text>
        </Card>
      </Card.Content>

      <Card.Content style={styles.cardBody}>
        <Text style={styles.cardBodyItemTitle}> Reservas Canceladas </Text>
        {props.canceledBookings.length === 0 ? (
          <Card>
            <Card.Content>
              <Text style={{ textAlign: 'center', fontSize: 18 }}>
                {' '}
                No hay reservas canceladas{' '}
              </Text>
            </Card.Content>
          </Card>
        ) : (
          <Card style={{elevation: 5}}>
            <Bookings
              bookings={props.canceledBookings}
              state={States.CanceledByUser}
            />
          </Card>
        )}
      </Card.Content>
    </Card>
  );
};
