import React from 'react';
import { StyleSheet } from 'react-native';
import { FAB, Icon } from 'react-native-elements';

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 30,
    right: 0,
    bottom: 0,
  },
})

type Props = {
  onPress: any;
  blocked: boolean;
};

export const BlockBooknigssButton = (props: Props) => {
  return (
    <FAB
    style={styles.fab}
    title={props.blocked ? "Desbloquear" : "Bloquear"}
      icon={<Icon name={props.blocked ? "lock-open" : "lock"} type="ionicons" size={25} color="white" />}
      color={props.blocked ? "#4b5173" : "#F27979"}
      onPress={props.onPress}
    />
  );
};
