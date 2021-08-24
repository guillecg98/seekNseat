import { BookingDTO } from '@seekNseat/contracts/booking';
import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import { Card } from 'react-native-paper';

import { CanceledBookings } from './canceled-bookings.component';

const styles = StyleSheet.create({
  container: {
    top: -60,
    margin: 10,
    elevation: 5,
    borderRadius: 20,
    alignSelf: 'center',
    backgroundColor: '#f4f4f7',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  cardHeaderItem: {
    padding: 7,
    margin: 5,
    elevation: 4,
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
  cardBody: {
    padding: 15,
    marginTop: 15,
    justifyContent: 'center',
  },
  cardBodyItemTitle: {
    fontSize: 20,
    margin: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cardBodyItemText: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 60,
    marginBottom: 40,
  },
});

interface Props {
  acceptedBookings: number;
  pendingBookings: number;
  declinedBookings: number;
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
            {props.acceptedBookings}{' '}
          </Text>
        </Card>
        <Card style={styles.cardHeaderItem}>
          <Icon name="timer" type="ionicon" />
          <Text style={styles.cardHeaderItemTitle}> Pendientes </Text>
          <Text style={styles.cardHeaderItemContent}>
            {' '}
            {props.pendingBookings}{' '}
          </Text>
        </Card>
        <Card style={styles.cardHeaderItem}>
          <Icon name="flame" type="ionicon" color="#F27979" />
          <Text style={styles.cardHeaderItemTitle}> En cola </Text>
          <Text style={styles.cardHeaderItemContent}>
            {' '}
            {props.declinedBookings}{' '}
          </Text>
        </Card>
      </Card.Content>

      <Card.Content style={styles.cardBody}>
        <Text style={styles.cardBodyItemTitle}> Reservas Canceladas </Text>
        {props.canceledBookings.length === 0 ? (
          <Text style={styles.cardBodyItemText}>
            {' '}
            No hay reservas canceladas
          </Text>
        ) : (
          <CanceledBookings canceledBookings={props.canceledBookings} />
        )}
      </Card.Content>
    </Card>
  );
};
