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
};

export const BlockBooknigssButton = (props: Props) => {
  return (
    <FAB
    style={styles.fab}
    title="Block"
      icon={<Icon name="cancel" type="ionicons" size={25} color="white" />}
      color="#4b5173"
      onPress={props.onPress}
    />
  );
};
