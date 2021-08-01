import { CategoryDTO } from '@seekNseat/contracts';
import React, { useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { Button, Input } from 'react-native-elements';

import { SearchBar } from '../components';

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
    margin: 15,
    justifyContent: 'center',
  },
  dropdown: {
    margin: 10,
    backgroundColor: 'white',
    borderBottomColor: '#596275',
    borderBottomWidth: 1,
    marginTop: 30,
  },
  skipButton: {
    backgroundColor: '#4884CA',
    width: 100,
  },
  sectionFooter: {
    flex: 2,
    padding: 15,
    justifyContent: 'center',
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

export const UserHomePage = ({ navigation }) => {
  const [foodies, setFoodies] = useState('');
  const [category, setCategory] = useState(null);

  return (
    <View style={styles.container}>
      <View style={styles.sectionHeader}>
        <Text style={styles.textHeader}> Welcome back, username! </Text>
      </View>

      <View style={styles.section}>
        <SearchBar />
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
          value={foodies}
          onChangeText={setFoodies}
          placeholder="Number of foodies"
          keyboardType="numeric"
        />

        <Button
          buttonStyle={styles.skipButton}
          title="Next"
          onPress={() => navigation.navigate('Businesses')}
        />
      </View>

      <View style={styles.sectionFooter}>
        <Text style={{ textAlign: 'center' }}>
          {' '}
          The main navbar for users should be here
        </Text>
      </View>
    </View>
  );
};
