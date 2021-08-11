import { CategoryDTO } from '@seekNseat/contracts';
import React, { useContext, useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { Button, Input } from 'react-native-elements';

import { AuthContext } from '../../auth/navigation';
import { SearchBar } from '../components';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  sectionHeader: {
    flex: 2,
    justifyContent: 'center',
  },
  textHeader: {
    fontSize: 35,
    fontFamily: 'Feather',
    color: '#4884CA',
    textAlign: 'center',
  },
  section: {
    flex: 4,
    padding: 10,
  },
  dropdown: {
    marginTop: 20,
    margin: 10,
    backgroundColor: 'white',
    borderBottomColor: '#596275',
    borderBottomWidth: 1,
  },
  skipButton: {
    backgroundColor: '#4884CA',
    width: 100,
  },
  sectionFooter: {
    flex: 1,
    justifyContent:  'center',
    padding: 15,
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

export const UserHomePage = () => {
  const { user } = useContext(AuthContext);
  const [foodies, setFoodies] = useState('');
  const [category, setCategory] = useState(null);

  return (
    <View style={styles.container}>
      <View style={styles.sectionHeader}>
        <Text style={styles.textHeader}> Welcome back, user.name! </Text>
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
          style={{marginTop: 20,}}
          value={foodies}
          onChangeText={setFoodies}
          placeholder="Number of foodies"
          keyboardType="numeric"
        />
      </View>

      <View style={styles.sectionFooter}>
        <Button
          buttonStyle={styles.skipButton}
          title="Next"
          // onPress={() => navigation.navigate('Businesses')}
          onPress={() => console.log('business list view')}
        />
      </View>
    </View>
  );
};
