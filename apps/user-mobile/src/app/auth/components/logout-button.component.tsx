import React from 'react';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

const styles = StyleSheet.create({
  button: {
    margin: 25,
    elevation: 8,
    borderRadius: 30,
  },
});

type Props = {
  onPress: any;
}

export const LogoutButton = (props: Props) => {

  return (
    <Button
      labelStyle={{fontSize: 16, color: 'white'}}
      style={styles.button}
      mode="contained"
      uppercase={false}
      color='#F27979'
      onPress={props.onPress}>
        Cerrar Sesión
    </Button>
  );
};