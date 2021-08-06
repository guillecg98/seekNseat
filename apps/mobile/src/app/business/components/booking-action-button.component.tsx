import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

const styles = StyleSheet.create({
  button: {
      borderRadius: 20,
      borderWidth: 2,
  }
})

type Props = {
  disabled: boolean;
  text: string;
  color: string;
  onPress: any;
}

export const BookingActionButton = (props: Props) => {
  return(
    <Button
    labelStyle={{color: '#f7f7f7'}}
      style={styles.button}
      disabled={props.disabled}
      mode='contained'
      uppercase={false}
      color={props.color}
      onPress={props.onPress}>
        {props.text}
      </Button>
  )
}