import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { Button, Input } from 'react-native-elements';

import { PublishBusinessButton } from '../components';
import { createBusiness } from '../requests';

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


export const RegisterBusinessScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [category, setCategory] = useState(null);

  const onPublishBusiness = () => {
    createBusiness(name, contactPhone).then((res) => console.log(res?.data));

    navigation.navigate('Initial');
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

        <Button
          buttonStyle={styles.skipButton}
          title="Skip"
          onPress={() => navigation.navigate('BusinessHomePage')}
        />
      </View>

      <View style={{ flex: 0.5 }} />

      {/* </ScrollView> */}
    </View>
  );
};
