import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

const styles = StyleSheet.create({
  button: {
    margin: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#0D8686',
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

export const ResquestBookingButton = (props: Props) => {

  return (
    <Button
      style={styles.button}
      mode={props.mode}
      uppercase={false}
      color='#0D8686'
      onPress={props.onPress}>
        {props.text}
    </Button>
  );
};