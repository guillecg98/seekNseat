import { BusinessDTO } from '@seekNseat/contracts/business';
import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { Button, Input } from 'react-native-elements';

import { AuthContext } from '../../auth/navigation';
import { PublishBusinessButton } from '../components';
import { createBusiness } from '../requests';
import { getBusinesses } from '../requests/queries/get-businesses.request';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: 'white',
  },
  section: {
    flex: 1,
    padding: 15,
    margin: 15,
    justifyContent: 'center',
  },
  textIntro: {
    fontSize: 25,
    color: '#4884CA',
    textAlign: 'center',
  },
  dropdown: {
    margin: 10,
    backgroundColor: 'white',
    borderBottomColor: '#596275',
    borderBottomWidth: 1,
  },
  skipButton: {
    marginTop: 15,
    backgroundColor: '#4884CA',
    width: 100,
  },
});
const data = [
  { label: 'Indio', value: '1' },
  { label: 'Chino', value: '2' },
  { label: 'Mexicano', value: '3' },
  { label: 'Fast-food', value: '4' },
  { label: 'Vegetariano', value: '5' },
  { label: 'Americano', value: '6' },
  { label: 'Italiano', value: '7' },
  { label: 'Japones', value: '8' },
];

export const BusinessRegisterScreen = ({ navigation }) => {
  const { bearerToken, businessId, setOwner } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [category, setCategory] = useState(null);
  const [businesses, setBusinesses] = useState<BusinessDTO[]>();

  useEffect(() => {
    if (bearerToken) {
      getBusinesses(bearerToken).then((res) => {
        setBusinesses(res?.data);
      });
    }
  }, [bearerToken]);

  if (
    businesses &&
    businesses.some((business) => business.ownerId === businessId)
  ) {
    setOwner(true);
  }

  const onPublishBusiness = () => {
    createBusiness(name, contactPhone, bearerToken).then((res) =>
      console.log(res?.data)
    );

    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      {/* <ScrollView> */}

      <View style={styles.section}>
        <Text style={styles.textIntro}>
          {' '}
          Nice! Tell us about your awesome business{' '}
        </Text>
      </View>

      <View style={styles.section}>
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={{ fontSize: 18 }}
          placeholder="Select Category"
          data={data}
          labelField="label"
          valueField="value"
          value={category}
          onChange={(item) => {
            setCategory(item.value);
          }}
        />

        <Input
          placeholder="Business name"
          onChangeText={setName}
          value={name}
        />

        <Input
          placeholder="Contact phone"
          onChangeText={setContactPhone}
          value={contactPhone}
          keyboardType="numeric"
        />

        <PublishBusinessButton onPress={onPublishBusiness} />
      </View>

      <View style={{ flex: 0.5 }} />

      {/* </ScrollView> */}
    </View>
  );
};
