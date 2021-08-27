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
  list: {
    flex: 6,
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
    fontWeight: 'normal',
  },
});

export const BusinessesScreen = ({ navigation, route }) => {
  const { bearerToken } = useContext(AuthContext);
  const [businesses, setBusinesses] = useState<BusinessDTO[]>([]);
  const { selectedCategory } = route.params;

  useEffect(() => {
    getBusinesses(selectedCategory, bearerToken).then((res) => {
      setBusinesses(res?.data);
    });
  }, []);

  if (!businesses) {
    return (
      <View style={[styles.container, {margin: 15, justifyContent: 'center' }]}>
        <ActivityIndicator animating={true} size="large" color="#0D8686" />
      </View>
    );
  } else {
    return businesses.length !== 0 ? (
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>
            {' '}
            Esto es lo que hemos encontrado para ti{' '}
          </Text>
        </View>
      <View style={styles.list}>
        <Businesses businesses={businesses} navigation={navigation} />
      </View>
      </View>
    ) : (
      <View style={[styles.container, { margin: 15, justifyContent: 'center' }]}>
        <Text style={{ fontSize: 20, textAlign: 'center' }}>
          {' '}
          No hemos encontrado negocios según tus filtros
        </Text>
      </View>
    );
  }
};
