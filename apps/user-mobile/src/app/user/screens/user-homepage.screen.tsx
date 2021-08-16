import { CategoryDTO } from '@seekNseat/contracts';
import React, { useContext, useState } from 'react';
import { useController, useForm } from 'react-hook-form';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { Button, Icon, Input } from 'react-native-elements';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import { AuthContext } from '../../auth/navigation';
import { SearchBar } from '../components';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  activityIndicatorContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  sectionHeader: {
    flex: 2,
    justifyContent: 'center',
  },
  textHeader: {
    fontSize: 32,
    fontFamily: 'Feather',
    color: '#0D8686',
    textAlign: 'center',
  },
  section: {
    flex: 4,
    padding: 20,
  },
  dropdown: {
    marginTop: 30,
    margin: 10,
    backgroundColor: 'white',
    borderBottomColor: '#0D8686',
    borderBottomWidth: 1,
  },
  timeSection: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  timeText: {
    fontSize: 18,
    alignSelf: 'center',
    color: '#494949',
  },
  timeButton: {
    borderColor: '#0D8686',
    width: 80,
  },
  timeButtonTitle: {
    color: '#0D8686',
  },
  skipButton: {
    alignSelf: 'flex-start',
    width: 130,
    borderRadius: 30,
    backgroundColor: '#0D8686',
  },
  sectionFooter: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
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

const NumberOfFoodiesInput = ({ name, control }) => {
  const { field } = useController({
    control,
    defaultValue: '',
    name,
  });
  return (
    <Input
      containerStyle={{ marginTop: 35 }}
      value={field.value}
      leftIcon={
        <Icon name="people-outline" size={22} type="ionicons" color="#494949" />
      }
      label="Numero de personas"
      labelStyle={{ color: '#494949' }}
      onChangeText={field.onChange}
      placeholder="Numero de personas"
      keyboardType="numeric"
    />
  );
};

export const UserHomePageScreen = ({ navigation }) => {
  const { user, bookingData, setBookingData } = useContext(AuthContext);
  const { control, handleSubmit } = useForm();
  const [category, setCategory] = useState(null);
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);

  const showTimePicker = () => {
    setTimePickerVisible(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisible(false);
  };

  const handleConfirm = (selectedTime: Date) => {
    hideTimePicker();
    selectedTime.setHours(selectedTime.getHours() + 2);
    setBookingData((bookingData) => ({
      ...bookingData,
      time: selectedTime,
    }));
  };

  const onSubmit = (inputData) => {
    setBookingData((bookingData) => ({
      ...bookingData,
      foodies: parseInt(inputData.foodies),
    }));
    navigation.navigate('Businesses');
  };

  return user && bookingData ? (
    <View style={styles.container}>
      <View style={styles.sectionHeader}>
        <Text style={styles.textHeader}>
          {' '}
          Bienvenido de nuevo, {user.givenName}!{' '}
        </Text>
      </View>

      <View style={styles.section}>
        <SearchBar />
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={{ fontSize: 18, textAlign: 'justify' }}
          placeholder="Busca por categoría"
          data={data}
          labelField="label"
          valueField="value"
          value={category}
          onChange={(item) => {
            setCategory(item.value);
          }}
        />
        <NumberOfFoodiesInput name="foodies" control={control} />

        <View style={styles.timeSection}>
          <Text style={styles.timeText}> Selecciona la hora </Text>
          <Button
            buttonStyle={styles.timeButton}
            titleStyle={styles.timeButtonTitle}
            type="outline"
            title={bookingData.time.toJSON().slice(11, -8)}
            onPress={showTimePicker}
          />
          <Icon
            style={{ marginTop: 10 }}
            name="alarm"
            size={22}
            type="ionicons"
            color="#494949"
          />
        </View>
        <DateTimePickerModal
          isVisible={isTimePickerVisible}
          mode="time"
          onConfirm={handleConfirm}
          onCancel={hideTimePicker}
        />
      </View>

      <View style={styles.sectionFooter}>
        <Button
          icon={
            <Icon
              style={{ marginLeft: 10 }}
              name="arrow-forward"
              size={22}
              type="ionicons"
              color="white"
            />
          }
          iconRight
          buttonStyle={styles.skipButton}
          title="Siguiente"
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </View>
  ) : (
    <View style={styles.activityIndicatorContainer}>
      <ActivityIndicator animating={true} size="large" color="#0D8686" />
    </View>
  );
};
