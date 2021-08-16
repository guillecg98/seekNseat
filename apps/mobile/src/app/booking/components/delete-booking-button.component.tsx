import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

const styles = StyleSheet.create({
  button: {
    margin: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#F27979',
  },
});

export enum mode {
  Outlined = 'outlined',
  Contained = 'contained',
}

type Props = {
  mode: mode;
  text: string;
  onPress: any;
}

export const DeleteBookingButton = (props: Props) => {

  return (
    <Button
      labelStyle={{color: 'white'}}
      style={styles.button}
      mode={props.mode}
      uppercase={false}
      color='#F27979'
      onPress={props.onPress}>
        {props.text}
    </Button>
  );
};