import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

const styles = StyleSheet.create({
  button: {
    margin: 15,
    elevation: 8,
    borderRadius: 30,
  },
});

type Props = {
  onPress: any;
}

export const ResquestBookingButton = (props: Props) => {

  return (
    <Button
      style={styles.button}
      mode="contained"
      uppercase={false}
      color='#4884CA'
      onPress={props.onPress}>
        Solicitar Reserva
    </Button>
  );
};