import { BusinessDTO } from '@seekNseat/contracts/business';
import React, { useContext, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { AuthContext } from '../../auth/navigation';
import { Businesses } from '../components';
import { getBusinesses } from '../requests';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textContainer: {
    flex: 1,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    color: '#0D8686',
    fontSize: 28,
    fontWeight: 'bold',
  },
});

export const BusinessesScreen = ({ navigation }) => {
  const [businesses, setBusinesses] = useState<BusinessDTO[]>([]);

  useEffect(() => {
    getBusinesses().then((res) => {
      setBusinesses(res?.data);
    });
  }, []);

  return businesses.length !== 0 ? (
    <ScrollView style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>
          {' '}
          Esto es lo que hemos encontrado para tí{' '}
        </Text>
      </View>

      <Businesses
        businesses={businesses}
        navigation={navigation}
      />
    </ScrollView>
  ) : (
    <View style={styles.container}>
      <ActivityIndicator animating={true} size="large" color="#0D8686" />
    </View>
  );
};
