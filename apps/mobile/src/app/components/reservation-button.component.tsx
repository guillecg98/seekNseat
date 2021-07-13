import React from 'react';
import { Button } from 'react-native-paper';

const buttonStyle = {
  margin: 15,
  elevation: 8,
};

const ReservationButton = () => {

  return (
    <Button
      style={buttonStyle}
      mode="contained"
      uppercase={false}
      color='#4884CA'
      onPress={() => console.log('you want a reservation')}>
        Get a reservation now
    </Button>
  );
};

export default ReservationButton;