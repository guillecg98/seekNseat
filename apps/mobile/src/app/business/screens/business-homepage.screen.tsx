import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { SecondaryCircleButton } from '../components';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  sectionHeader: {
    flex: 2,
    padding: 15,
    justifyContent: 'center',
  },
  textHeader: {
    fontSize: 35,
    color: '#4884CA',
    textAlign: 'center',
  },
  section: {
    flex: 4,
    padding: 10,
    flexDirection: 'row',
  },
  sectionFooter: {
    flex: 2,
    padding: 15,
    justifyContent: 'center',
  },
});

export const BusinessHomePageScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.sectionHeader}>
        <Text style={styles.textHeader}> Welcome back, username! </Text>
      </View>

      <View style={styles.section}>
        <SecondaryCircleButton
          title="Bookings"
          icon="book-open"
          onPress={() => console.log('open bookings')}
        />
        <SecondaryCircleButton
          title="Profile"
          icon="user"
          onPress={() => console.log('open profile')}
        />
      </View>
    </View>
  );
};
