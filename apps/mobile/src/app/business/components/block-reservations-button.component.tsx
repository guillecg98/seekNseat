import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

const styles = StyleSheet.create({
  button: {
    margin: 20,
    elevation: 5,
    borderRadius: 30,
  },
});

type Props = {
  onPress: any;
}

export const BlockReservationsButton = (props: Props) => {

  return (
    <Button
      style={styles.button}
      labelStyle={{fontSize: 18}}
      mode="contained"
      uppercase={false}
      color='#4b5173'
      onPress={props.onPress}>
        Block reservations
    </Button>
  );
};