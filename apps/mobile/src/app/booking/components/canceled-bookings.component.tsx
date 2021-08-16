import { BookingDTO } from '@seekNseat/contracts/booking';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Icon, ListItem } from 'react-native-elements';
import { Card, Modal, Portal } from 'react-native-paper';

import { deleteBooking } from '../requests';
import { BookingActionButton } from './booking-action-button.component';
import { DeleteBookingButton, mode } from './delete-booking-button.component';

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
  modal: {
    backgroundColor: 'white',
    padding: 20,
    margin: 15,
    borderRadius: 10,
  },
  noShow: {
    textAlign: 'center',
    fontSize: 18,
    color: 'red',
  },
  text: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 60,
    marginBottom: 40,
  },
});

interface Props {
  canceledBookings: BookingDTO[];
}

export const CanceledBookings = (props: Props) => {
  const [canceledBookings, setCanceledBookings] = useState<BookingDTO[]>(
    props.canceledBookings
  );
  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const onPressDeleteBooking = (deletedBooking: BookingDTO) => {
    deleteBooking(deletedBooking._id).then((res) =>
      setCanceledBookings(
        canceledBookings.filter((booking) => booking._id !== deletedBooking._id)
      )
    );
    hideModal();
  };

  const onPressNewBooking = (deletedBooking: BookingDTO) => {
    console.log('new booking from business');
  };

  return canceledBookings.length !== 0 ? (
    <View style={styles.listContainer}>
      <ScrollView style={styles.list}>
        {canceledBookings.map((booking) => (
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
              <Portal>
                <Modal
                  visible={visible}
                  onDismiss={hideModal}
                  contentContainerStyle={styles.modal}
                >
                  <Icon
                    style={{ margin: 10 }}
                    name="book"
                    size={40}
                    type="ionicon"
                    color="#F27979"
                  />
                  <Text
                    style={{
                      textAlign: 'center',
                      fontSize: 18,
                      color: '#525252',
                    }}
                  >
                    ¿ Está seguro de que quiere borrar esta reserva ?
                  </Text>
                  <DeleteBookingButton
                    text="Eliminar reserva"
                    mode={mode.Contained}
                    onPress={() => {
                      onPressDeleteBooking(booking);
                    }}
                  />
                </Modal>
              </Portal>
              <View style={{ marginTop: 10, flexDirection: 'row' }}>
                <BookingActionButton
                  disabled={false}
                  text="Nueva"
                  color="#0D8686"
                  onPress={() => onPressNewBooking(booking)}
                />
                <BookingActionButton
                  disabled={false}
                  text={'Eliminar'}
                  color="#d17979"
                  onPress={showModal}
                />
              </View>
            </ListItem.Content>
          </ListItem>
        ))}
      </ScrollView>
    </View>
  ) : (
    <Text style={styles.text}> No hay reservas canceladas</Text>
  );
};
