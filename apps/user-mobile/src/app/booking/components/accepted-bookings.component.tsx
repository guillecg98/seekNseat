import { BookingDTO } from '@seekNseat/contracts/booking';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Icon, ListItem } from 'react-native-elements';
import { Modal, Portal, Provider } from 'react-native-paper';

import { States } from '../../utils';
import { cancelBooking } from '../requests';
import { BookingActionButton } from './booking-action-button.component';
import { CancelBookingButton } from './cancel-booking-button.component';

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
  text: {
    fontSize: 18,
    textAlign: 'center',
  },
});

interface Props {
  acceptedBookings: BookingDTO[];
}

export const AcceptedBookings = (props: Props) => {
  const [acceptedBookings, setAcceptedBookings] = useState<BookingDTO[]>(
    props.acceptedBookings
  );
  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const onPressCancelBooking = (booking: BookingDTO) => {
    cancelBooking(booking._id, States.CanceledByUser, false).then((res) =>
      setAcceptedBookings(
        acceptedBookings.filter(
          (acceptedBooking) => acceptedBooking._id !== booking._id
        )
      )
    );
    hideModal();
  };

  return acceptedBookings.length !== 0 ? (
    <Provider>
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
                <ListItem.Title style={{fontSize: 20}}>
                  <Text>¡Genial! </Text>
                  <Text style={{fontWeight: 'bold'}}>{booking.businessName}</Text>
                </ListItem.Title>
                <ListItem.Title style={{ fontSize: 18, margin: 5 }}>
                  Ha aceptdo tu solicitud!
                </ListItem.Title>
                <ListItem.Title style={{ alignSelf: 'center', textAlign: 'justify', fontSize: 18, margin: 15 }}>
                  Tu mesa para {booking.numberOfFoodies} estará lista a las{' '}
                  {booking.time.toString().slice(11, -8)}
                </ListItem.Title>
                <Portal>
                  <Modal
                    visible={visible}
                    onDismiss={hideModal}
                    contentContainerStyle={styles.modal}
                  >
                    <Icon
                      style={{ margin: 10 }}
                      name="sad"
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
                      ¿ No puedes asistir a tu reserva ?, si cancelas ahora no
                      podrás recuperarla, y el restaurante cederá tu mesa a otro
                      cliente.
                    </Text>
                    <CancelBookingButton
                      text="Cancelar"
                      onPress={() => {
                        onPressCancelBooking(booking);
                      }}
                    />
                  </Modal>
                </Portal>
                <BookingActionButton
                  disabled={false}
                  text={'Cancelar Reserva'}
                  color="#F27979"
                  onPress={showModal}
                />
              </ListItem.Content>
            </ListItem>
          ))}
        </ScrollView>
      </View>
    </Provider>
  ) : (
    <Text style={styles.text}> No hay solicitudes aceptadas </Text>
  );
};
