import React from 'react';
import { baseProps } from 'react-native-gesture-handler/lib/typescript/handlers/gestureHandlers';
import { Button, useTheme } from 'react-native-paper';

const buttonStyle = {
  margin: 15,
  elevation: 8,
  borderRadius: 30,
};

type Props = {
  onPress: any;
}

export const ReservationButton = (props: Props) => {

  return (
    <Button
      style={buttonStyle}
      mode="contained"
      uppercase={false}
      color='#4884CA'
      onPress={props.onPress}>
        Get a reservation now
    </Button>
  );
};